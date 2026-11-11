import db from '../db/database';

const EXPIRATION_MINUTES = Number(process.env.VISIT_EXPIRATION_MINUTES ?? 5);

export function expireStaleVisits(): number {
  const cutoff = new Date(Date.now() - EXPIRATION_MINUTES * 60 * 1000).toISOString();

  const result = db
    .prepare(
      "UPDATE visit SET status = 'EXPIRED', responded_at = ?, decision_note = 'Respuesta automática: sin respuesta en el tiempo configurado', auto_responded = 1 WHERE status = 'PENDING' AND requested_at < ?",
    )
    .run(new Date().toISOString(), cutoff);

  return result.changes;
}
