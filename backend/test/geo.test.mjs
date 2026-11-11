import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { haversineMeters } from '../dist/services/geo.service.js';

describe('geo haversine', () => {
  it('returns 0 for identical points', () => {
    assert.equal(haversineMeters(-34.6, -58.4, -34.6, -58.4), 0);
  });
  it('computes ~111km per degree latitude', () => {
    const d = haversineMeters(0, 0, 1, 0);
    assert.ok(d > 110000 && d < 112000, `expected ~111195, got ${d}`);
  });
  it('is symmetric', () => {
    const a = haversineMeters(-34.6, -58.4, -34.7, -58.5);
    const b = haversineMeters(-34.7, -58.5, -34.6, -58.4);
    assert.equal(a, b);
  });
});
