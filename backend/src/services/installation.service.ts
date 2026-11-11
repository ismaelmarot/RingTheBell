import { randomUUID } from 'crypto';
import db from '../db/database';

export interface Installation {
  id: string;
  name: string;
  type: string;
  latitude: number | null;
  longitude: number | null;
  geofence_radius_meters: number;
  created_at: string;
}

export function createInstallation(params: { name: string; type: string; latitude?: number | null; longitude?: number | null; geofenceRadiusMeters?: number }): Installation {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare('INSERT INTO installation (id, name, type, latitude, longitude, geofence_radius_meters, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
    id,
    params.name,
    params.type,
    params.latitude ?? null,
    params.longitude ?? null,
    params.geofenceRadiusMeters ?? 5,
    createdAt,
  );
  return { id, name: params.name, type: params.type, latitude: params.latitude ?? null, longitude: params.longitude ?? null, geofence_radius_meters: params.geofenceRadiusMeters ?? 5, created_at: createdAt };
}

export function updateInstallationLocation(params: { id: string; latitude: number; longitude: number; geofenceRadiusMeters?: number }): boolean {
  const result = db.prepare('UPDATE installation SET latitude = ?, longitude = ?, geofence_radius_meters = ? WHERE id = ?').run(
    params.latitude,
    params.longitude,
    params.geofenceRadiusMeters ?? 5,
    params.id,
  );
  return result.changes > 0;
}

export function listInstallations(): Installation[] {
  return db.prepare('SELECT * FROM installation ORDER BY created_at DESC').all() as Installation[];
}

export function getInstallation(id: string): Installation | null {
  return (db.prepare('SELECT * FROM installation WHERE id = ?').get(id) as Installation) ?? null;
}

export function deleteInstallation(id: string): boolean {
  const result = db.prepare('DELETE FROM installation WHERE id = ?').run(id);
  return result.changes > 0;
}
