import { randomUUID } from 'crypto';
import db from '../db/database';
import { notifyInstallation } from './notification.service';

export type VisitStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'FINALIZED';

export function listVisitsByInstallation(params: { installationId: string }): unknown[] {
  return db
    .prepare('SELECT * FROM visit WHERE installation_id = ? ORDER BY requested_at DESC')
    .all(params.installationId);
}

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

  notifyInstallation({
    installationId: params.installationId,
    visitId: id,
    type: 'VISIT_REQUEST',
    message: `Nueva solicitud de visita de ${params.visitorName}`,
  });

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

export function getVisitCard(visitId: string): unknown {
  const visit = db.prepare('SELECT * FROM visit WHERE id = ?').get(visitId) as Record<string, unknown> | undefined;
  if (!visit) return null;
  const installation = db.prepare('SELECT id, name, type FROM installation WHERE id = ?').get(visit.installation_id);
  const unit = visit.unit_id ? db.prepare('SELECT id, code, floor FROM unit WHERE id = ?').get(visit.unit_id) : null;
  const responder = visit.responded_by ? db.prepare('SELECT id, email, role FROM user WHERE id = ?').get(visit.responded_by) : null;
  return { visit, installation, unit, responder };
}
