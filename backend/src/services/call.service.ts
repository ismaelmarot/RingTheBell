import { randomUUID } from 'crypto';
import db from '../db/database';

export type CallType = 'audio' | 'video';
export type CallResult = 'accepted' | 'rejected' | 'missed' | 'ended';

export interface CallLog {
  id: string;
  visit_id: string;
  type: CallType;
  initiator_id: string | null;
  initiator_name: string;
  started_at: string | null;
  ended_at: string | null;
  duration_seconds: number | null;
  result: CallResult;
  created_at: string;
}

export function createCallLog(params: {
  visitId: string;
  type: CallType;
  initiatorId: string | null;
  initiatorName: string;
  result: CallResult;
}): CallLog {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(
    'INSERT INTO call_log (id, visit_id, type, initiator_id, initiator_name, started_at, ended_at, duration_seconds, result, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  ).run(id, params.visitId, params.type, params.initiatorId, params.initiatorName, null, null, null, params.result, createdAt);
  return { id, visit_id: params.visitId, type: params.type, initiator_id: params.initiatorId, initiator_name: params.initiatorName, started_at: null, ended_at: null, duration_seconds: null, result: params.result, created_at: createdAt };
}

export function startCall(id: string): CallLog | null {
  const startedAt = new Date().toISOString();
  db.prepare("UPDATE call_log SET started_at = ?, result = 'accepted' WHERE id = ?").run(startedAt, id);
  return getCall(id);
}

export function endCall(params: { id: string; result: CallResult }): CallLog | null {
  const endedAt = new Date().toISOString();
  const row = db.prepare('SELECT started_at FROM call_log WHERE id = ?').get(params.id) as { started_at: string | null } | undefined;
  let duration: number | null = null;
  if (row?.started_at) {
    duration = Math.round((new Date(endedAt).getTime() - new Date(row.started_at).getTime()) / 1000);
  }
  db.prepare('UPDATE call_log SET ended_at = ?, duration_seconds = ?, result = ? WHERE id = ?').run(endedAt, duration, params.result, params.id);
  return getCall(params.id);
}

export function rejectCall(id: string): CallLog | null {
  db.prepare("UPDATE call_log SET result = 'rejected', ended_at = ? WHERE id = ?").run(new Date().toISOString(), id);
  return getCall(id);
}

export function getCall(id: string): CallLog | null {
  return (db.prepare('SELECT * FROM call_log WHERE id = ?').get(id) as CallLog) ?? null;
}

export function listCallsByVisit(visitId: string): CallLog[] {
  return db.prepare('SELECT * FROM call_log WHERE visit_id = ? ORDER BY created_at DESC').all(visitId) as CallLog[];
}