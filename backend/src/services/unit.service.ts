import { randomUUID } from 'crypto';
import db from '../db/database';

export interface Unit {
  id: string;
  installation_id: string;
  code: string;
  floor: string | null;
}

export function createUnit(params: { installationId: string; code: string; floor?: string | null }): Unit {
  const id = randomUUID();
  db.prepare('INSERT INTO unit (id, installation_id, code, floor) VALUES (?, ?, ?, ?)').run(
    id,
    params.installationId,
    params.code,
    params.floor ?? null,
  );
  return { id, installation_id: params.installationId, code: params.code, floor: params.floor ?? null };
}

export function listUnitsByInstallation(installationId: string): Unit[] {
  return db
    .prepare('SELECT * FROM unit WHERE installation_id = ? ORDER BY code ASC')
    .all(installationId) as Unit[];
}

export function getUnit(id: string): Unit | null {
  return (db.prepare('SELECT * FROM unit WHERE id = ?').get(id) as Unit) ?? null;
}

export function deleteUnit(id: string): boolean {
  const result = db.prepare('DELETE FROM unit WHERE id = ?').run(id);
  return result.changes > 0;
}
