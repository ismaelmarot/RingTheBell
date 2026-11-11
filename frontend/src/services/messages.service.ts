import { apiFetch } from './api';
import type { Message } from '@/interface';

export async function listMessages(visitId: string): Promise<Message[]> {
  return apiFetch<Message[]>(`/messages?visitId=${encodeURIComponent(visitId)}`);
}

export async function sendMessage(params: {
  visitId: string;
  senderName: string;
  content?: string | null;
  imageUrl?: string | null;
}): Promise<Message> {
  return apiFetch<Message>('/messages', {
    method: 'POST',
    body: JSON.stringify({
      visitId: params.visitId,
      senderName: params.senderName,
      content: params.content ?? null,
      imageUrl: params.imageUrl ?? null,
    }),
  });
}