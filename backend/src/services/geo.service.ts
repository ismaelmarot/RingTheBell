import db from '../db/database';

export interface GeoValidationResult {
  allowed: boolean;
  distanceMeters: number | null;
  radiusMeters: number;
  reason: string;
  accuracy?: number;
}

export function validateLocation(params: {
  installationId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
}): GeoValidationResult {
  const installation = db.prepare('SELECT latitude, longitude, geofence_radius_meters FROM installation WHERE id = ?').get(params.installationId) as
    | { latitude: number | null; longitude: number | null; geofence_radius_meters: number }
    | undefined;

  if (!installation) {
    return { allowed: false, distanceMeters: null, radiusMeters: 0, reason: 'Instalación no encontrada' };
  }
  if (installation.latitude == null || installation.longitude == null) {
    return { allowed: true, distanceMeters: null, radiusMeters: installation.geofence_radius_meters, reason: 'Sin ubicación configurada: validación omitida' };
  }
  // Reject low-accuracy readings
  if (params.accuracy > 50) {
    return { allowed: false, distanceMeters: null, radiusMeters: installation.geofence_radius_meters, reason: 'Precisión de ubicación insuficiente', accuracy: params.accuracy };
  }

  const distance = haversineMeters(installation.latitude, installation.longitude, params.latitude, params.longitude);
  const allowed = distance <= installation.geofence_radius_meters;
  return {
    allowed,
    distanceMeters: Math.round(distance),
    radiusMeters: installation.geofence_radius_meters,
    reason: allowed ? 'Dentro del radio permitido' : 'Fuera del radio permitido',
    accuracy: params.accuracy,
  };
}

export function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}