-- Hotel Sherpa Soul CMS Database Schema (Neon Serverless PostgreSQL)

CREATE TABLE IF NOT EXISTS cms (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE cms ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE cms ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE TABLE IF NOT EXISTS blob_uploads (
  upload_id UUID PRIMARY KEY,
  pathname TEXT NOT NULL,
  blob_url TEXT,
  content_type TEXT,
  size_bytes INTEGER,
  status TEXT,
  error_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  referenced_at TIMESTAMPTZ
);

ALTER TABLE blob_uploads ADD COLUMN IF NOT EXISTS blob_url TEXT;
ALTER TABLE blob_uploads ADD COLUMN IF NOT EXISTS content_type TEXT;
ALTER TABLE blob_uploads ADD COLUMN IF NOT EXISTS size_bytes INTEGER;
ALTER TABLE blob_uploads ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE blob_uploads ADD COLUMN IF NOT EXISTS error_reason TEXT;
ALTER TABLE blob_uploads ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE blob_uploads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE blob_uploads ADD COLUMN IF NOT EXISTS referenced_at TIMESTAMPTZ;

ALTER TABLE blob_uploads DROP CONSTRAINT IF EXISTS blob_uploads_status_check;
ALTER TABLE blob_uploads ADD CONSTRAINT blob_uploads_status_check
  CHECK (status IN ('pending', 'ready', 'referenced', 'failed'));
