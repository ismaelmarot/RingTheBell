import { apiFetch } from './api';
import type { CallLog } from '@/interface';

export async function listCalls(visitId: string): Promise<CallLog[]> {
  return apiFetch<CallLog[]>(`/calls?visitId=${encodeURIComponent(visitId)}`);
}

export async function createCall(params: { visitId: string; type: 'audio' | 'video'; initiatorName: string }): Promise<CallLog> {
  return apiFetch<CallLog>('/calls', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function startCall(id: string): Promise<CallLog> {
  return apiFetch<CallLog>(`/calls/${id}/start`, { method: 'POST' });
}

export async function endCall(id: string, result: 'ended' | 'rejected' | 'missed' = 'ended'): Promise<CallLog> {
  return apiFetch<CallLog>(`/calls/${id}/end`, { method: 'POST', body: JSON.stringify({ result }) });
}

export async function rejectCall(id: string): Promise<CallLog> {
  return apiFetch<CallLog>(`/calls/${id}/reject`, { method: 'POST' });
}

export async function fetchRtcConfig(): Promise<{ iceServers: RTCIceServer[] }> {
  const data = await apiFetch<{ iceServers: RTCIceServer[] }>('/rtc-config');
  return data;
}