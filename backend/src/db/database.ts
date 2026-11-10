import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

fs.mkdirSync(path.resolve(process.cwd(), 'data'), { recursive: true });

const db = new Database(path.resolve(process.cwd(), 'data', 'ringthebell.db'));

db.pragma('foreign_keys = ON');

export function initDatabase(): void {
  const schemaPath = path.resolve(process.cwd(), 'src', 'db', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema);
}

export default db;
