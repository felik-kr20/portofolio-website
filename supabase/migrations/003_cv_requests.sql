-- Migration 003: cv_requests table
-- Menyimpan data recruiter yang meminta CV

CREATE TABLE IF NOT EXISTS cv_requests (
  id          BIGSERIAL PRIMARY KEY,
  nama        TEXT NOT NULL,
  company     TEXT NOT NULL,
  email       TEXT NOT NULL,
  whatsapp    TEXT,
  env         TEXT NOT NULL DEFAULT 'production',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index untuk query by env dan waktu
CREATE INDEX IF NOT EXISTS cv_requests_env_idx        ON cv_requests (env);
CREATE INDEX IF NOT EXISTS cv_requests_created_at_idx ON cv_requests (created_at DESC);

-- Enable Row Level Security
ALTER TABLE cv_requests ENABLE ROW LEVEL SECURITY;

-- Policy: allow insert from anon/authenticated (frontend can record)
DROP POLICY IF EXISTS "allow_insert_cv_requests" ON cv_requests;
CREATE POLICY "allow_insert_cv_requests"
  ON cv_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: allow select from anon/authenticated (dashboard can read)
DROP POLICY IF EXISTS "allow_select_cv_requests" ON cv_requests;
CREATE POLICY "allow_select_cv_requests"
  ON cv_requests FOR SELECT
  TO anon, authenticated
  USING (true);