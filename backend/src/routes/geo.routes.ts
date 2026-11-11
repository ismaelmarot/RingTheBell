import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateLocation } from '../services/geo.service';

const router = Router();

router.post('/validate', authMiddleware, (req, res) => {
  const { installationId, latitude, longitude, accuracy } = req.body ?? {};
  if (!installationId || latitude == null || longitude == null) {
    res.status(400).json({ success: false, error: 'Instalación y coordenadas requeridas' });
    return;
  }
  const result = validateLocation({ installationId, latitude, longitude, accuracy: accuracy ?? 0 });
  res.json({ success: true, data: result });
});

export default router;