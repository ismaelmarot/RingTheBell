import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/database';

const JWT_SECRET = process.env.JWT_SECRET || 'ringthebell-dev-secret';
const DEFAULT_INSTALLATION_ID = 'inst_1';

export type UserRole = 'ADMIN_PRINCIPAL' | 'ADMIN' | 'ENCARGADO' | 'RESIDENT';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function createUser(params: {
  installationId: string;
  email: string;
  password: string;
  role: UserRole;
}): { id: string; email: string; role: UserRole } {
  const existing = db.prepare('SELECT id FROM user WHERE email = ?').get(params.email) as
    | { id: string }
    | undefined;

  if (existing) {
    throw new Error('Email ya registrado');
  }

  const id = randomUUID();
  const createdAt = new Date().toISOString();

  db.prepare(
    'INSERT INTO user (id, installation_id, email, password_hash, role, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
  ).run(id, params.installationId, params.email, hashPassword(params.password), params.role, 'ACTIVE', createdAt);

  return { id, email: params.email, role: params.role };
}

export function login(params: { email: string; password: string }): {
  token: string;
  user: { id: string; email: string; role: UserRole };
} {
  const user = db.prepare('SELECT * FROM user WHERE email = ?').get(params.email) as
    | { id: string; email: string; password_hash: string; role: UserRole }
    | undefined;

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const valid = verifyPassword(params.password, user.password_hash);
  if (!valid) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, installationId: DEFAULT_INSTALLATION_ID },
    JWT_SECRET,
    { expiresIn: '24h' },
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

export function verifyToken(token: string): {
  id: string;
  email: string;
  role: UserRole;
  installationId?: string;
} | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: UserRole;
      installationId?: string;
    };
    return decoded;
  } catch {
    return null;
  }
}

export function initializeAdmin(): void {
  const installation = db.prepare('SELECT id FROM installation WHERE id = ?').get('inst_1') as
    | { id: string }
    | undefined;

  if (!installation) {
    db.prepare('INSERT INTO installation (id, name, type, created_at) VALUES (?, ?, ?, ?)').run(
      'inst_1',
      'Principal',
      'building',
      new Date().toISOString(),
    );
  }

  const existing = db.prepare('SELECT id FROM user WHERE email = ?').get('admin@mail.com') as
    | { id: string }
    | undefined;

  if (!existing) {
    createUser({
      installationId: DEFAULT_INSTALLATION_ID,
      email: 'admin@mail.com',
      password: 'admin123',
      role: 'ADMIN_PRINCIPAL',
    });
  }
}
