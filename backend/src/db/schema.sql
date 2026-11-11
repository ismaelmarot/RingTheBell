CREATE TABLE IF NOT EXISTS installation (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  geofence_radius_meters INTEGER DEFAULT 5,
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
  auto_responded INTEGER DEFAULT 0,
  FOREIGN KEY (installation_id) REFERENCES installation (id),
  FOREIGN KEY (unit_id) REFERENCES unit (id)
);

CREATE TABLE IF NOT EXISTS notification (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  visit_id TEXT,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  read INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (id),
  FOREIGN KEY (visit_id) REFERENCES visit (id)
);

CREATE TABLE IF NOT EXISTS message (
  id TEXT PRIMARY KEY,
  visit_id TEXT NOT NULL,
  sender_id TEXT,
  sender_name TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (visit_id) REFERENCES visit (id)
);

CREATE TABLE IF NOT EXISTS call_log (
  id TEXT PRIMARY KEY,
  visit_id TEXT NOT NULL,
  type TEXT NOT NULL,
  initiator_id TEXT,
  initiator_name TEXT NOT NULL,
  started_at TEXT,
  ended_at TEXT,
  duration_seconds INTEGER,
  result TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (visit_id) REFERENCES visit (id)
);


CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE IF NOT EXISTS push_subscription (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (id)
);
