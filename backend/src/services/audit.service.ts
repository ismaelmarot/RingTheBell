import { randomUUID } from 'crypto';
import db from '../db/database';

export interface AuditEntry {
  id: string;
  user_id: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  details: string | null;
  created_at: string;
}

export function logAction(params: {
  userId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  details?: string | null;
}): void {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare('INSERT INTO audit_log (id, user_id, action, entity, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
    id,
    params.userId,
    params.action,
    params.entity,
    params.entityId,
    params.details ?? null,
    createdAt,
  );
}

export function listAudit(limit = 100): AuditEntry[] {
  return db.prepare('SELECT * FROM audit_log ORDER BY created_at DESC LIMIT ?').all(limit) as AuditEntry[];
}