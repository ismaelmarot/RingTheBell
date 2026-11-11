import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  listNotificationsByUser,
  markNotificationRead,
  countUnread,
} from '../services/notification.service';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ success: false, error: 'No autorizado' });
    return;
  }
  const notifications = listNotificationsByUser(userId);
  res.json({ success: true, data: { notifications, unread: countUnread(userId) } });
});

router.post('/:id/read', authMiddleware, (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ success: false, error: 'No autorizado' });
    return;
  }
  const ok = markNotificationRead(req.params.id, userId);
  if (!ok) {
    res.status(404).json({ success: false, error: 'Notificación no encontrada' });
    return;
  }
  res.json({ success: true, data: { read: true } });
});

export default router;