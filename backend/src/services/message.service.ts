import { randomUUID } from 'crypto';
import db from '../db/database';

export interface Message {
  id: string;
  visit_id: string;
  sender_id: string | null;
  sender_name: string;
  content: string | null;
  image_url: string | null;
  created_at: string;
}

export function createMessage(params: {
  visitId: string;
  senderId: string | null;
  senderName: string;
  content: string | null;
  imageUrl: string | null;
}): Message {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(
    'INSERT INTO message (id, visit_id, sender_id, sender_name, content, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
  ).run(id, params.visitId, params.senderId, params.senderName, params.content, params.imageUrl, createdAt);
  return { id, visit_id: params.visitId, sender_id: params.senderId, sender_name: params.senderName, content: params.content, image_url: params.imageUrl, created_at: createdAt };
}

export function listMessagesByVisit(visitId: string): Message[] {
  return db
    .prepare('SELECT * FROM message WHERE visit_id = ? ORDER BY created_at ASC')
    .all(visitId) as Message[];
}
