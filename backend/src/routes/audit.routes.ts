import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { listAudit } from '../services/audit.service';

const router = Router();

router.get('/', authMiddleware, requireRole('ADMIN_PRINCIPAL', 'ADMIN'), (req, res) => {
  const limit = Number(req.query.limit ?? 100);
  res.json({ success: true, data: listAudit(limit) });
});

export default router;