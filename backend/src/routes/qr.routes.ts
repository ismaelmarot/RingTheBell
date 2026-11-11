import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import {
  generateQr,
  listQrs,
  getQr,
  revokeQr,
  replaceQr,
  resolveToken,
  getQrByToken,
} from '../services/qr.service';
import { logAction } from '../services/audit.service';

const router = Router();

// Public resolve (visitor flow) — no auth
router.get('/resolve/:token', (req, res) => {
  const result = resolveToken(req.params.token);
  if (!result) {
    res.status(404).json({ success: false, error: 'Código QR inválido o revocado' });
    return;
  }
  res.json({ success: true, data: result });
});

router.get('/', authMiddleware, (req, res) => {
  const installationId = req.query.installationId as string;
  if (!installationId) {
    res.status(400).json({ success: false, error: 'installationId requerido' });
    return;
  }
  res.json({ success: true, data: listQrs(installationId) });
});

router.post('/', authMiddleware, requireRole('ADMIN_PRINCIPAL', 'ADMIN'), async (req, res) => {
  const { installationId, unitId, mode } = req.body ?? {};
  if (!installationId || !mode) {
    res.status(400).json({ success: false, error: 'Instalación y modo requeridos' });
    return;
  }
  if (mode !== 'GENERAL' && mode !== 'SINGLE') {
    res.status(400).json({ success: false, error: 'Modo inválido' });
    return;
  }
  try {
    const qr = await generateQr({ installationId, unitId: unitId ?? null, mode });
    res.status(201).json({ success: true, data: qr });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  const qr = getQr(req.params.id);
  if (!qr) {
    res.status(404).json({ success: false, error: 'QR no encontrado' });
    return;
  }
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
  const dataUrl = await (async () => {
    const QRCode = (await import('qrcode')).default;
    return QRCode.toDataURL(`${FRONTEND_URL}/select-bell/${qr.token}`, { width: 300, margin: 2 });
  })();
  res.json({ success: true, data: { ...qr, dataUrl } });
});

router.post('/:id/revoke', authMiddleware, requireRole('ADMIN_PRINCIPAL', 'ADMIN'), (req, res) => {
  const ok = revokeQr(req.params.id);
  if (!ok) {
    res.status(404).json({ success: false, error: 'QR no encontrado o ya revocado' });
    return;
  }
  logAction({ userId: req.user?.id ?? null, action: 'REVOKE_QR', entity: 'qr_code', entityId: req.params.id, details: null });
  res.json({ success: true, data: { revoked: true } });
});

router.post('/:id/replace', authMiddleware, requireRole('ADMIN_PRINCIPAL', 'ADMIN'), async (req, res) => {
  const qr = await replaceQr(req.params.id);
  if (!qr) {
    res.status(404).json({ success: false, error: 'QR no encontrado' });
    return;
  }
  logAction({ userId: req.user?.id ?? null, action: 'REPLACE_QR', entity: 'qr_code', entityId: req.params.id, details: null });
  res.json({ success: true, data: qr });
});

export default router;