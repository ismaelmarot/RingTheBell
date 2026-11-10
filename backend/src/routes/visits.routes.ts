import { Router } from 'express';
import { createVisit, respondVisit, finalizeVisit } from '../services/visit.service';

const router = Router();

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
    res.json({ success: true, data: visit });
  } catch (err) {
    res.status(409).json({ success: false, error: (err as Error).message });
  }
});

export default router;
