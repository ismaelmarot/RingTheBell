import { apiFetch } from './api';
import type { Visit } from '@/interface';

export async function listVisits(): Promise<Visit[]> {
  return apiFetch<Visit[]>('/visits');
}

export async function createVisit(params: {
  installationId: string;
  unitId?: string | null;
  visitorName: string;
  reason?: string | null;
  company?: string | null;
}): Promise<{ id: string }> {
  return apiFetch<{ id: string }>('/visits', {
    method: 'POST',
    body: JSON.stringify({
      installationId: params.installationId,
      unitId: params.unitId ?? null,
      visitorName: params.visitorName,
      reason: params.reason ?? null,
      company: params.company ?? null,
    }),
  });
}

export async function respondVisit(
  id: string,
  decision: 'ACCEPTED' | 'REJECTED',
  responderId: string,
): Promise<{ id: string }> {
  return apiFetch<{ id: string }>(`/visits/${id}/respond`, {
    method: 'POST',
    body: JSON.stringify({ decision, responderId }),
  });
}

export async function finalizeVisit(id: string, finalizerId: string): Promise<{ id: string }> {
  return apiFetch<{ id: string }>(`/visits/${id}/finalize`, {
    method: 'POST',
    body: JSON.stringify({ finalizerId }),
  });
}
