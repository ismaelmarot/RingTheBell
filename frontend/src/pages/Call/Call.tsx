import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { getToken } from '@/services/auth.service';
import { Header } from '@/components/Header';
import { createCall, endCall, fetchRtcConfig, listCalls, rejectCall } from '@/services/calls.service';
import { validateGeo, getCurrentPosition } from '@/services/geo.service';
import { apiFetch } from '@/services/api';
import type { CallLog } from '@/interface';
import {
  ActionButton,
  ButtonRow,
  CallHistoryItem,
  EmptyState,
  GeoWarning,
  IncomingModal,
  ModalActions,
  PageContainer,
  SectionTitle,
  StatusCard,
  StatusText,
  Video,
  VideoGrid,
} from './Call.styles';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const Call = () => {
  const { visitId } = useParams<{ visitId: string }>();
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [status, setStatus] = useState<string>('idle');
  const [incoming, setIncoming] = useState<{ callId: string; type: string; from: string } | null>(null);
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<'audio' | 'video'>('audio');
  const [error, setError] = useState<string | null>(null);
  const [geoStatus, setGeoStatus] = useState<string>('');

  const socketRef = useRef<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const senderName = (() => {
    const token = getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.email) return payload.email as string;
      } catch {
        // ignore
      }
    }
    return 'Usuario';
  })();

  useEffect(() => {
    if (!visitId) return;
    const run = async () => {
      try {
        const card = await apiFetch<{ installation: { id: string; latitude?: number; longitude?: number } | null }>(`/visits/card/${visitId}`);
        const inst = card.installation;
        if (!inst?.id) return;
        // Only validate if installation has location configured; fetch installation details
        try {
          const position = await getCurrentPosition();
          const result = await validateGeo({
            installationId: inst.id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          setGeoStatus(result.allowed ? '' : result.reason);
        } catch {
          setGeoStatus('No se pudo validar la ubicación');
        }
      } catch {
        // ignore geo errors
      }
    };
    void run();
  }, [visitId]);

  const cleanupMedia = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
  }, []);

  const loadCalls = useCallback(async () => {
    if (!visitId) return;
    try {
      const data = await listCalls(visitId);
      setCalls(data);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [visitId]);

  useEffect(() => {
    if (!visitId) return;
    const run = async () => {
      await loadCalls();
    };
    void run();

    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socketRef.current = socket;
    socket.on('connect', () => {
      socket.emit('join_visit', visitId);
    });

    socket.on('incoming_call', (payload: { callId: string; type: string; from: string }) => {
      setIncoming(payload);
    });

    socket.on('call_accepted', async (payload: { callId: string }) => {
      if (payload.callId !== activeCallId) return;
      // caller: create offer
      const pc = pcRef.current;
      if (!pc) return;
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit('webrtc_offer', { visitId, offer, from: senderName });
    });

    socket.on('call_rejected', (payload: { callId: string }) => {
      if (payload.callId === activeCallId) {
        setStatus('rejected');
        cleanupMedia();
        setActiveCallId(null);
      }
    });

    socket.on('call_ended', (payload: { callId: string }) => {
      if (payload.callId === activeCallId) {
        setStatus('ended');
        cleanupMedia();
        setActiveCallId(null);
      }
    });

    socket.on('webrtc_offer', async (payload: { offer: RTCSessionDescriptionInit; from: string }) => {
      const pc = pcRef.current;
      if (!pc) return;
      await pc.setRemoteDescription(new RTCSessionDescription(payload.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('webrtc_answer', { visitId, answer, from: senderName });
    });

    socket.on('webrtc_answer', async (payload: { answer: RTCSessionDescriptionInit }) => {
      const pc = pcRef.current;
      if (!pc) return;
      await pc.setRemoteDescription(new RTCSessionDescription(payload.answer));
    });

    socket.on('webrtc_ice', async (payload: { candidate: RTCIceCandidateInit }) => {
      const pc = pcRef.current;
      if (!pc) return;
      try {
        await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
      } catch {
        // ignore
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      cleanupMedia();
    };
  }, [visitId, activeCallId, cleanupMedia, loadCalls, senderName]);

  const setupPeerConnection = useCallback(async (type: 'audio' | 'video') => {
    const config = await fetchRtcConfig();
    const pc = new RTCPeerConnection({ iceServers: config.iceServers });
    pcRef.current = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('webrtc_ice', { visitId, candidate: event.candidate, from: senderName });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    const constraints: MediaStreamConstraints = { audio: true, video: type === 'video' };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localStreamRef.current = stream;
    if (localVideoRef.current && type === 'video') {
      localVideoRef.current.srcObject = stream;
    }
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    return pc;
  }, [visitId, senderName]);

  const handleStartCall = async (type: 'audio' | 'video') => {
    if (!visitId) return;
    setError(null);
    try {
      const call = await createCall({ visitId, type, initiatorName: senderName });
      setActiveCallId(call.id);
      setActiveType(type);
      setStatus('calling');
      await setupPeerConnection(type);
      socketRef.current?.emit('call_request', { visitId, callId: call.id, type, from: senderName });
    } catch (err) {
      setError((err as Error).message);
      cleanupMedia();
    }
  };

  const handleAccept = async () => {
    if (!incoming) return;
    const { callId, type } = incoming;
    setIncoming(null);
    setActiveCallId(callId);
    setActiveType(type as 'audio' | 'video');
    setStatus('connecting');
    try {
      await setupPeerConnection(type as 'audio' | 'video');
      await (await import('@/services/calls.service')).startCall(callId);
      socketRef.current?.emit('call_accept', { visitId, callId });
    } catch (err) {
      setError((err as Error).message);
      cleanupMedia();
    }
  };

  const handleReject = async () => {
    if (!incoming) return;
    try {
      await rejectCall(incoming.callId);
    } catch {
      // ignore
    }
    socketRef.current?.emit('call_reject', { visitId, callId: incoming.callId });
    setIncoming(null);
  };

  const handleEnd = async () => {
    if (!activeCallId) return;
    try {
      await endCall(activeCallId, 'ended');
    } catch {
      // ignore
    }
    socketRef.current?.emit('call_end', { visitId, callId: activeCallId, result: 'ended' });
    setStatus('ended');
    cleanupMedia();
    setActiveCallId(null);
    await loadCalls();
  };

  return (
    <PageContainer>
      <Header title="Llamadas" />
      {error ? <EmptyState><p>{error}</p></EmptyState> : null}
      <ButtonRow>
        <ActionButton type="button" onClick={() => void handleStartCall('audio')} disabled={!!activeCallId || !!geoStatus}>
          Llamada de audio
        </ActionButton>
        <ActionButton type="button" onClick={() => void handleStartCall('video')} disabled={!!activeCallId || !!geoStatus}>
          Videollamada
        </ActionButton>
        {activeCallId ? (
          <ActionButton $variant="danger" type="button" onClick={() => void handleEnd()}>
            Colgar
          </ActionButton>
        ) : null}
      </ButtonRow>
      <StatusCard><StatusText>Estado: {status}</StatusText></StatusCard>
      {geoStatus ? <GeoWarning>{geoStatus}</GeoWarning> : null}
      <VideoGrid>
        {activeType === 'video' ? (
          <>
            <Video ref={localVideoRef} autoPlay muted playsInline />
            <Video ref={remoteVideoRef} autoPlay playsInline />
          </>
        ) : (
          <Video ref={remoteVideoRef} autoPlay playsInline />
        )}
      </VideoGrid>

      {incoming ? (
        <IncomingModal>
          <EmptyState>
            Llamada entrante de {incoming.from} ({incoming.type})
          </EmptyState>
          <ModalActions>
            <ActionButton type="button" onClick={() => void handleAccept()}>
              Aceptar
            </ActionButton>
            <ActionButton type="button" onClick={() => void handleReject()}>
              Rechazar
            </ActionButton>
          </ModalActions>
        </IncomingModal>
      ) : null}

      <SectionTitle>Historial de llamadas</SectionTitle>
      {calls.length === 0 ? <EmptyState><div className="icon">📞</div><p>Sin llamadas</p></EmptyState> : null}
      {calls.map((c) => (
        <CallHistoryItem key={c.id}>
          {c.type} · {c.result} · {c.initiator_name} · {c.duration_seconds ?? 0}s
        </CallHistoryItem>
      ))}
    </PageContainer>
  );
};