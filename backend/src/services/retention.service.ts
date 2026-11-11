import db from '../db/database';

const RETENTION_DAYS = Number(process.env.RETENTION_DAYS ?? 90);

export function cleanupExpiredRecords(): { deleted: Record<string, number> } {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const deleted: Record<string, number> = {};

  const tables = ['message', 'notification', 'call_log', 'visit'];
  for (const table of tables) {
    const col = table === 'visit' ? 'requested_at' : 'created_at';
    const result = db.prepare(`DELETE FROM ${table} WHERE ${col} < ?`).run(cutoff);
    deleted[table] = result.changes;
  }

  // Clean old QR codes (revoked/replaced) older than retention
  const qrResult = db.prepare("DELETE FROM qr_code WHERE status IN ('REVOKED','REPLACED') AND created_at < ?").run(cutoff);
  deleted.qr_code = qrResult.changes;

  // Clean old audit logs
  const auditResult = db.prepare('DELETE FROM audit_log WHERE created_at < ?').run(cutoff);
  deleted.audit_log = auditResult.changes;

  return { deleted };
}