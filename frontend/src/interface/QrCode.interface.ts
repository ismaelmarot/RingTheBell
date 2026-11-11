export interface QrCode {
  id: string;
  token: string;
  installation_id: string;
  unit_id: string | null;
  mode: 'GENERAL' | 'SINGLE';
  status: 'ACTIVE' | 'REVOKED' | 'REPLACED';
  created_at: string;
  dataUrl?: string;
}
