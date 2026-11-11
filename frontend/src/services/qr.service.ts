import { apiFetch } from './api';
import type { QrCode } from '@/interface';

export async function listQrs(installationId: string): Promise<QrCode[]> {
  return apiFetch<QrCode[]>(`/qr?installationId=${encodeURIComponent(installationId)}`);
}

export async function generateQr(params: {
  installationId: string;
  unitId?: string | null;
  mode: 'GENERAL' | 'SINGLE';
}): Promise<QrCode> {
  return apiFetch<QrCode>('/qr', {
    method: 'POST',
    body: JSON.stringify({
      installationId: params.installationId,
      unitId: params.unitId ?? null,
      mode: params.mode,
    }),
  });
}

export async function getQr(id: string): Promise<QrCode> {
  return apiFetch<QrCode>(`/qr/${id}`);
}

export async function revokeQr(id: string): Promise<{ revoked: boolean }> {
  return apiFetch<{ revoked: boolean }>(`/qr/${id}/revoke`, { method: 'POST' });
}

export async function replaceQr(id: string): Promise<QrCode> {
  return apiFetch<QrCode>(`/qr/${id}/replace`, { method: 'POST' });
}

export async function resolveQr(token: string): Promise<{ installation: unknown; unit: unknown; qr: QrCode }> {
  return apiFetch<{ installation: unknown; unit: unknown; qr: QrCode }>(`/qr/resolve/${token}`);
}
