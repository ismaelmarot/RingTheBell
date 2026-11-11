import { apiFetch } from './api';

export interface GeoValidationResult {
  allowed: boolean;
  distanceMeters: number | null;
  radiusMeters: number;
  reason: string;
  accuracy?: number;
}

export async function validateGeo(params: { installationId: string; latitude: number; longitude: number; accuracy: number }): Promise<GeoValidationResult> {
  return apiFetch<GeoValidationResult>('/geo/validate', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no soportada'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
  });
}