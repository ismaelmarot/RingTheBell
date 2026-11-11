import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { saveSubscription, removeSubscription, listSubscriptionsByUser } from '../services/push.service';

const router = Router();

router.post('/subscribe', authMiddleware, (req, res) => {
  const userId = req.user?.id;
  const { endpoint, keys } = req.body ?? {};
  if (!userId || !endpoint || !keys?.p256dh || !keys?.auth) {
    res.status(400).json({ success: false, error: 'Suscripción inválida' });
    return;
  }
  const sub = saveSubscription({ userId, endpoint, p256dh: keys.p256dh, auth: keys.auth });
  res.status(201).json({ success: true, data: sub });
});

router.post('/unsubscribe', authMiddleware, (req, res) => {
  const { endpoint } = req.body ?? {};
  if (!endpoint) {
    res.status(400).json({ success: false, error: 'Endpoint requerido' });
    return;
  }
  const ok = removeSubscription(endpoint);
  res.json({ success: true, data: { removed: ok } });
});

router.get('/subscriptions', authMiddleware, (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ success: false, error: 'No autorizado' });
    return;
  }
  res.json({ success: true, data: listSubscriptionsByUser(userId) });
});

export default router;