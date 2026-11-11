import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { createVisit, respondVisit, finalizeVisit, listVisitsByInstallation, getVisitCard } from '../services/visit.service';
import { expireStaleVisits } from '../services/expiration.service';
import { logAction } from '../services/audit.service';

const router = Router();

router.get('/card/:id', (req, res) => {
  const card = getVisitCard(req.params.id);
  if (!card) {
    res.status(404).json({ success: false, error: 'Visita no encontrada' });
    return;
  }
  res.json({ success: true, data: card });
});

router.post('/expire', authMiddleware, (req, res) => {
  const expired = expireStaleVisits();
  res.json({ success: true, data: { expired } });
});

router.get('/', authMiddleware, (req, res) => {
  const installationId = req.user?.installationId;

  if (!installationId) {
    res.status(403).json({ success: false, error: 'Sin instalación asociada' });
    return;
  }

  const visits = listVisitsByInstallation({ installationId });
  res.json({ success: true, data: visits });
});

router.post('/', (req, res) => {
  const { installationId, unitId, visitorName, visitorPhoto, reason, company, status } = req.body ?? {};

  if (!installationId || !visitorName) {
    res.status(400).json({ success: false, error: 'Instalación y nombre de visitante requeridos' });
    return;
  }

  try {
    const visit = createVisit({
      installationId,
      unitId: unitId ?? null,
      visitorName,
      visitorPhoto: visitorPhoto ?? null,
      reason: reason ?? null,
      company: company ?? null,
      status: (status as 'PENDING') ?? 'PENDING',
    });
    res.status(201).json({ success: true, data: visit });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
});

router.post('/:id/respond', (req, res) => {
  const { id } = req.params;
  const { decision, responderId, decisionNote } = req.body ?? {};

  if (decision !== 'ACCEPTED' && decision !== 'REJECTED') {
    res.status(400).json({ success: false, error: 'Decisión inválida' });
    return;
  }

  if (!responderId) {
    res.status(400).json({ success: false, error: 'Respondedor requerido' });
    return;
  }

  try {
    const visit = respondVisit({ id, decision, responderId, decisionNote });
    logAction({ userId: responderId, action: `VISIT_${decision}`, entity: 'visit', entityId: id, details: decisionNote ?? null });
    res.json({ success: true, data: visit });
  } catch (err) {
    res.status(409).json({ success: false, error: (err as Error).message });
  }
});

router.post('/:id/finalize', (req, res) => {
  const { id } = req.params;
  const { finalizerId } = req.body ?? {};

  if (!finalizerId) {
    res.status(400).json({ success: false, error: 'Finalizador requerido' });
    return;
  }

  try {
    const visit = finalizeVisit({ id, finalizerId });
    logAction({ userId: finalizerId, action: 'VISIT_FINALIZED', entity: 'visit', entityId: id, details: null });
    res.json({ success: true, data: visit });
  } catch (err) {
    res.status(409).json({ success: false, error: (err as Error).message });
  }
});

export default router;
