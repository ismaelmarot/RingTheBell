import { apiFetch } from './api';
import type { Installation, Unit } from '@/interface';

export async function listInstallations(): Promise<Installation[]> {
  return apiFetch<Installation[]>('/installations');
}

export async function createInstallation(params: { name: string; type: string }): Promise<Installation> {
  return apiFetch<Installation>('/installations', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function deleteInstallation(id: string): Promise<{ deleted: boolean }> {
  return apiFetch<{ deleted: boolean }>(`/installations/${id}`, { method: 'DELETE' });
}

export async function listUnits(installationId: string): Promise<Unit[]> {
  return apiFetch<Unit[]>(`/installations/${installationId}/units`);
}

export async function createUnit(params: { installationId: string; code: string; floor?: string | null }): Promise<Unit> {
  return apiFetch<Unit>(`/installations/${params.installationId}/units`, {
    method: 'POST',
    body: JSON.stringify({ code: params.code, floor: params.floor ?? null }),
  });
}

export async function deleteUnit(installationId: string, unitId: string): Promise<{ deleted: boolean }> {
  return apiFetch<{ deleted: boolean }>(`/installations/${installationId}/units/${unitId}`, { method: 'DELETE' });
}
