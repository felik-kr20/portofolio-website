-- Tambah kolom instagram dan linkedin ke contact_clicks
ALTER TABLE contact_clicks
  ADD COLUMN IF NOT EXISTS instagram INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS linkedin  INTEGER NOT NULL DEFAULT 0;

-- Tabel settings untuk toggle Open to Opportunities dll
CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Default value
INSERT INTO site_settings (key, value)
VALUES ('open_to_opportunities', 'true')
ON CONFLICT (key) DO NOTHING;
