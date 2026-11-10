import { apiFetch } from './api';
import type { AuthResponse, AuthUser } from '@/interface';

const TOKEN_KEY = 'ringthebell_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function login(params: { email: string; password: string }): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return data;
}

export async function register(params: {
  installationId: string;
  email: string;
  password: string;
  role: string;
}): Promise<AuthUser> {
  const data = await apiFetch<AuthUser>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return data;
}
