CREATE TABLE IF NOT EXISTS installation (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS unit (
  id TEXT PRIMARY KEY,
  installation_id TEXT NOT NULL,
  code TEXT NOT NULL,
  floor TEXT,
  FOREIGN KEY (installation_id) REFERENCES installation (id)
);

CREATE TABLE IF NOT EXISTS user (
  id TEXT PRIMARY KEY,
  installation_id TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (installation_id) REFERENCES installation (id)
);

CREATE TABLE IF NOT EXISTS qr_code (
  id TEXT PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  installation_id TEXT NOT NULL,
  unit_id TEXT,
  mode TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (installation_id) REFERENCES installation (id),
  FOREIGN KEY (unit_id) REFERENCES unit (id)
);

CREATE TABLE IF NOT EXISTS visit (
  id TEXT PRIMARY KEY,
  installation_id TEXT NOT NULL,
  unit_id TEXT,
  visitor_name TEXT NOT NULL,
  visitor_photo TEXT,
  reason TEXT,
  company TEXT,
  status TEXT NOT NULL,
  requested_at TEXT NOT NULL,
  responded_at TEXT,
  responded_by TEXT,
  decision_note TEXT,
  FOREIGN KEY (installation_id) REFERENCES installation (id),
  FOREIGN KEY (unit_id) REFERENCES unit (id)
);
