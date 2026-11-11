import { randomBytes, randomUUID } from 'crypto';
import QRCode from 'qrcode';
import db from '../db/database';

export type QrMode = 'GENERAL' | 'SINGLE';
export type QrStatus = 'ACTIVE' | 'REVOKED' | 'REPLACED';

export interface QrCode {
  id: string;
  token: string;
  installation_id: string;
  unit_id: string | null;
  mode: QrMode;
  status: QrStatus;
  created_at: string;
}

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export async function generateQr(params: {
  installationId: string;
  unitId: string | null;
  mode: QrMode;
  baseUrl?: string;
}): Promise<QrCode & { dataUrl: string }> {
  const id = randomUUID();
  const token = randomBytes(24).toString('hex');
  const createdAt = new Date().toISOString();

  db.prepare(
    'INSERT INTO qr_code (id, token, installation_id, unit_id, mode, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
  ).run(id, token, params.installationId, params.unitId, params.mode, 'ACTIVE', createdAt);

  const baseUrl = params.baseUrl || FRONTEND_URL;
  const url = `${baseUrl}/select-bell/${token}`;
  const dataUrl = await QRCode.toDataURL(url, { width: 300, margin: 2 });

  return { id, token, installation_id: params.installationId, unit_id: params.unitId, mode: params.mode, status: 'ACTIVE', created_at: createdAt, dataUrl };
}

export function listQrs(installationId: string): QrCode[] {
  return db
    .prepare('SELECT * FROM qr_code WHERE installation_id = ? ORDER BY created_at DESC')
    .all(installationId) as QrCode[];
}

export function getQr(id: string): QrCode | null {
  return (db.prepare('SELECT * FROM qr_code WHERE id = ?').get(id) as QrCode) ?? null;
}

export function getQrByToken(token: string): QrCode | null {
  return (db.prepare('SELECT * FROM qr_code WHERE token = ?').get(token) as QrCode) ?? null;
}

export function revokeQr(id: string): boolean {
  const result = db.prepare("UPDATE qr_code SET status = 'REVOKED' WHERE id = ? AND status = 'ACTIVE'").run(id);
  return result.changes > 0;
}

export async function replaceQr(id: string): Promise<(QrCode & { dataUrl: string }) | null> {
  const existing = getQr(id);
  if (!existing) return null;
  revokeQr(id);
  db.prepare("UPDATE qr_code SET status = 'REPLACED' WHERE id = ?").run(id);
  return generateQr({
    installationId: existing.installation_id,
    unitId: existing.unit_id,
    mode: existing.mode as QrMode,
  });
}

export function resolveToken(token: string): { installation: unknown; unit: unknown; qr: QrCode } | null {
  const qr = getQrByToken(token);
  if (!qr || qr.status !== 'ACTIVE') return null;
  const installation = db.prepare('SELECT id, name, type FROM installation WHERE id = ?').get(qr.installation_id);
  const unit = qr.unit_id ? db.prepare('SELECT id, code, floor FROM unit WHERE id = ?').get(qr.unit_id) : null;
  return { installation, unit, qr };
}
