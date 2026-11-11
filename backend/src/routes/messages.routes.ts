import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { createMessage, listMessagesByVisit } from '../services/message.service';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  const visitId = req.query.visitId as string;
  if (!visitId) {
    res.status(400).json({ success: false, error: 'visitId requerido' });
    return;
  }
  res.json({ success: true, data: listMessagesByVisit(visitId) });
});

router.post('/', authMiddleware, (req, res) => {
  const { visitId, senderName, content, imageUrl } = req.body ?? {};
  if (!visitId || !senderName) {
    res.status(400).json({ success: false, error: 'Visita y remitente requeridos' });
    return;
  }
  if (!content && !imageUrl) {
    res.status(400).json({ success: false, error: 'Contenido o imagen requerido' });
    return;
  }
  const message = createMessage({
    visitId,
    senderId: req.user?.id ?? null,
    senderName,
    content: content ?? null,
    imageUrl: imageUrl ?? null,
  });
  res.status(201).json({ success: true, data: message });
});

export default router;