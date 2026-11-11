import { randomUUID } from 'crypto';
import db from '../db/database';

export interface Notification {
  id: string;
  user_id: string;
  visit_id: string | null;
  type: string;
  message: string;
  read: number;
  created_at: string;
}

export function createNotification(params: {
  userId: string;
  visitId: string | null;
  type: string;
  message: string;
}): Notification {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(
    'INSERT INTO notification (id, user_id, visit_id, type, message, read, created_at) VALUES (?, ?, ?, ?, ?, 0, ?)',
  ).run(id, params.userId, params.visitId, params.type, params.message, createdAt);
  return { id, user_id: params.userId, visit_id: params.visitId, type: params.type, message: params.message, read: 0, created_at: createdAt };
}

export function notifyInstallation(params: {
  installationId: string;
  visitId: string;
  message: string;
  type: string;
}): number {
  const users = db
    .prepare('SELECT id FROM user WHERE installation_id = ?')
    .all(params.installationId) as { id: string }[];
  let count = 0;
  for (const u of users) {
    createNotification({ userId: u.id, visitId: params.visitId, type: params.type, message: params.message });
    count++;
  }
  return count;
}

export function listNotificationsByUser(userId: string): Notification[] {
  return db
    .prepare('SELECT * FROM notification WHERE user_id = ? ORDER BY created_at DESC')
    .all(userId) as Notification[];
}

export function markNotificationRead(id: string, userId: string): boolean {
  const result = db.prepare('UPDATE notification SET read = 1 WHERE id = ? AND user_id = ?').run(id, userId);
  return result.changes > 0;
}

export function countUnread(userId: string): number {
  const row = db.prepare('SELECT COUNT(*) as c FROM notification WHERE user_id = ? AND read = 0').get(userId) as { c: number };
  return row.c;
}
