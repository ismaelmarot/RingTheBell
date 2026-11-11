import { randomUUID } from 'crypto';
import db from '../db/database';

export interface PushSubscription {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  created_at: string;
}

export function saveSubscription(params: { userId: string; endpoint: string; p256dh: string; auth: string }): PushSubscription {
  const existing = db.prepare('SELECT id FROM push_subscription WHERE endpoint = ?').get(params.endpoint) as { id: string } | undefined;
  if (existing) {
    db.prepare('UPDATE push_subscription SET user_id = ?, p256dh = ?, auth = ? WHERE endpoint = ?').run(params.userId, params.p256dh, params.auth, params.endpoint);
    return { id: existing.id, user_id: params.userId, endpoint: params.endpoint, p256dh: params.p256dh, auth: params.auth, created_at: new Date().toISOString() };
  }
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare('INSERT INTO push_subscription (id, user_id, endpoint, p256dh, auth, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(id, params.userId, params.endpoint, params.p256dh, params.auth, createdAt);
  return { id, user_id: params.userId, endpoint: params.endpoint, p256dh: params.p256dh, auth: params.auth, created_at: createdAt };
}

export function listSubscriptionsByUser(userId: string): PushSubscription[] {
  return db.prepare('SELECT * FROM push_subscription WHERE user_id = ?').all(userId) as PushSubscription[];
}

export function listAllSubscriptions(): PushSubscription[] {
  return db.prepare('SELECT * FROM push_subscription').all() as PushSubscription[];
}

export function removeSubscription(endpoint: string): boolean {
  const result = db.prepare('DELETE FROM push_subscription WHERE endpoint = ?').run(endpoint);
  return result.changes > 0;
}