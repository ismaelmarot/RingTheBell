import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiFetch } from '@/services/api';

describe('apiFetch', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('returns data on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: { id: '1' } }),
    }));
    const result = await apiFetch<{ id: string }>('/test');
    expect(result).toEqual({ id: '1' });
  });

  it('throws on error response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false, error: 'boom' }),
    }));
    await expect(apiFetch('/test')).rejects.toThrow('boom');
  });

  it('attaches bearer token when present', async () => {
    localStorage.setItem('ringthebell_token', 'tok123');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: null }),
    });
    vi.stubGlobal('fetch', fetchMock);
    await apiFetch('/test');
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/test'), expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer tok123' }),
    }));
  });
});