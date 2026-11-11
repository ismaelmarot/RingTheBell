import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import { app } from './app';
import { initDatabase } from './db/database';
import { initializeAdmin } from './services/auth.service';
import { expireStaleVisits } from './services/expiration.service';
import { cleanupExpiredRecords } from './services/retention.service';
import { createMessage, listMessagesByVisit } from './services/message.service';
import { createCallLog, startCall, endCall, rejectCall } from './services/call.service';

const PORT = process.env.PORT || 3001;
const CHECK_INTERVAL_MS = Number(process.env.EXPIRATION_CHECK_INTERVAL_MS ?? 60000);
const RETENTION_INTERVAL_MS = Number(process.env.RETENTION_CHECK_INTERVAL_MS ?? 24 * 60 * 60 * 1000);

initDatabase();
initializeAdmin();

expireStaleVisits();
setInterval(() => {
  const expired = expireStaleVisits();
  if (expired > 0) {
    console.log(`[expiration] ${expired} visita(s) expirada(s) automáticamente`);
  }
}, CHECK_INTERVAL_MS);

const retentionResult = cleanupExpiredRecords();
console.log('[retention] startup cleanup:', retentionResult.deleted);
setInterval(() => {
  const r = cleanupExpiredRecords();
  console.log('[retention] cleanup:', r.deleted);
}, RETENTION_INTERVAL_MS);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('join_visit', (visitId: string) => {
    if (visitId) socket.join(`visit:${visitId}`);
  });

  socket.on('send_message', (payload: { visitId: string; senderId?: string; senderName: string; content?: string; imageUrl?: string }) => {
    if (!payload?.visitId || !payload?.senderName) return;
    if (!payload.content && !payload.imageUrl) return;
    const message = createMessage({
      visitId: payload.visitId,
      senderId: payload.senderId ?? null,
      senderName: payload.senderName,
      content: payload.content ?? null,
      imageUrl: payload.imageUrl ?? null,
    });
    io.to(`visit:${payload.visitId}`).emit('new_message', message);
  });

  socket.on('request_history', (visitId: string) => {
    if (!visitId) return;
    const messages = listMessagesByVisit(visitId);
    socket.emit('history', messages);
  });

  // Call signaling
  socket.on('call_request', (payload: { visitId: string; callId: string; type: string; from: string }) => {
    if (!payload?.visitId) return;
    socket.to(`visit:${payload.visitId}`).emit('incoming_call', payload);
  });

  socket.on('call_accept', (payload: { visitId: string; callId: string }) => {
    if (!payload?.visitId) return;
    startCall(payload.callId);
    io.to(`visit:${payload.visitId}`).emit('call_accepted', payload);
  });

  socket.on('call_reject', (payload: { visitId: string; callId: string }) => {
    if (!payload?.visitId) return;
    rejectCall(payload.callId);
    io.to(`visit:${payload.visitId}`).emit('call_rejected', payload);
  });

  socket.on('call_end', (payload: { visitId: string; callId: string; result?: string }) => {
    if (!payload?.visitId) return;
    endCall({ id: payload.callId, result: (payload.result as 'ended') ?? 'ended' });
    io.to(`visit:${payload.visitId}`).emit('call_ended', payload);
  });

  socket.on('webrtc_offer', (payload: { visitId: string; offer: unknown; from: string }) => {
    if (!payload?.visitId) return;
    socket.to(`visit:${payload.visitId}`).emit('webrtc_offer', payload);
  });

  socket.on('webrtc_answer', (payload: { visitId: string; answer: unknown; from: string }) => {
    if (!payload?.visitId) return;
    socket.to(`visit:${payload.visitId}`).emit('webrtc_answer', payload);
  });

  socket.on('webrtc_ice', (payload: { visitId: string; candidate: unknown; from: string }) => {
    if (!payload?.visitId) return;
    socket.to(`visit:${payload.visitId}`).emit('webrtc_ice', payload);
  });
});

app.set('io', io);

server.listen(PORT, () => {
  console.log(`RingTheBell backend running on http://localhost:${PORT}`);
});