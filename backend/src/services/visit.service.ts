import { randomUUID } from 'crypto';
import db from '../db/database';

export type VisitStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'FINALIZED';

export function createVisit(params: {
  installationId: string;
  unitId: string | null;
  visitorName: string;
  visitorPhoto: string | null;
  reason: string | null;
  company: string | null;
  status: VisitStatus;
}): { id: string } {
  const id = randomUUID();
  const requestedAt = new Date().toISOString();

  db.prepare(
    'INSERT INTO visit (id, installation_id, unit_id, visitor_name, visitor_photo, reason, company, status, requested_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  ).run(id, params.installationId, params.unitId, params.visitorName, params.visitorPhoto, params.reason, params.company, params.status, requestedAt);

  return { id };
}

export function respondVisit(params: {
  id: string;
  decision: 'ACCEPTED' | 'REJECTED';
  responderId: string;
  decisionNote?: string | null;
}): { id: string } {
  const result = db.prepare(
    'UPDATE visit SET status = ?, responded_at = ?, responded_by = ?, decision_note = ? WHERE id = ? AND status = ?',
  ).run(params.decision, new Date().toISOString(), params.responderId, params.decisionNote ?? null, params.id, 'PENDING');

  if (result.changes === 0) {
    throw new Error('Solicitud no encontrada o ya respondida');
  }

  return { id: params.id };
}

export function finalizeVisit(params: { id: string; finalizerId: string }): { id: string } {
  const result = db.prepare(
    "UPDATE visit SET status = 'FINALIZED' WHERE id = ? AND status = ?",
  ).run(params.id, 'ACCEPTED');

  if (result.changes === 0) {
    throw new Error('Visita no finalizable en su estado actual');
  }

  return { id: params.id };
}
