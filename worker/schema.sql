-- sitrep-installs (D1). Apply with:
--   bunx wrangler d1 execute sitrep-installs --remote --file worker/schema.sql

-- One row per install per period. kind 'id': the app's monthly
-- Sitrep-Install id (0.9.3+), period YYYY-MM. kind 'ip': an older app that
-- sends no id, period YYYY-MM-DD, hash of IP + user agent under that day's
-- salt. Both store a SHA-256 prefix, never the id or the address itself.
CREATE TABLE IF NOT EXISTS installs (
  host TEXT NOT NULL,
  period TEXT NOT NULL,
  kind TEXT NOT NULL,
  hash TEXT NOT NULL,
  channel TEXT NOT NULL,
  version TEXT NOT NULL,
  arch TEXT NOT NULL,
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  checks INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (host, period, kind, hash)
);

-- Today's salt for the 'ip' hashes. Every earlier day's row is deleted on
-- the first check of a new day, so no stored hash can be recomputed from an
-- address after its day ends.
CREATE TABLE IF NOT EXISTS salts (
  day TEXT PRIMARY KEY,
  salt TEXT NOT NULL
);
