import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { createCallLog, endCall, rejectCall, startCall, getCall, listCallsByVisit } from '../services/call.service';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  const visitId = req.query.visitId as string;
  if (!visitId) {
    res.status(400).json({ success: false, error: 'visitId requerido' });
    return;
  }
  res.json({ success: true, data: listCallsByVisit(visitId) });
});

router.post('/', authMiddleware, (req, res) => {
  const { visitId, type, initiatorName } = req.body ?? {};
  if (!visitId || !type || !initiatorName) {
    res.status(400).json({ success: false, error: 'Visita, tipo e iniciador requeridos' });
    return;
  }
  if (type !== 'audio' && type !== 'video') {
    res.status(400).json({ success: false, error: 'Tipo inválido' });
    return;
  }
  const call = createCallLog({ visitId, type, initiatorId: req.user?.id ?? null, initiatorName, result: 'missed' });
  res.status(201).json({ success: true, data: call });
});

router.post('/:id/start', authMiddleware, (req, res) => {
  const call = startCall(req.params.id);
  if (!call) {
    res.status(404).json({ success: false, error: 'Llamada no encontrada' });
    return;
  }
  res.json({ success: true, data: call });
});

router.post('/:id/end', authMiddleware, (req, res) => {
  const { result } = req.body ?? {};
  const r = result === 'ended' || result === 'rejected' || result === 'missed' ? result : 'ended';
  const call = endCall({ id: req.params.id, result: r });
  if (!call) {
    res.status(404).json({ success: false, error: 'Llamada no encontrada' });
    return;
  }
  res.json({ success: true, data: call });
});

router.post('/:id/reject', authMiddleware, (req, res) => {
  const call = rejectCall(req.params.id);
  if (!call) {
    res.status(404).json({ success: false, error: 'Llamada no encontrada' });
    return;
  }
  res.json({ success: true, data: call });
});

router.get('/:id', authMiddleware, (req, res) => {
  const call = getCall(req.params.id);
  if (!call) {
    res.status(404).json({ success: false, error: 'Llamada no encontrada' });
    return;
  }
  res.json({ success: true, data: call });
});

export default router;