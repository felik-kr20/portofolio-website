-- Tabel page views
-- env: 'development' | 'production' — memisahkan data dev dan live
CREATE TABLE IF NOT EXISTS page_views (
  id         BIGSERIAL PRIMARY KEY,
  date       DATE        NOT NULL,
  env        TEXT        NOT NULL DEFAULT 'production',
  count      INTEGER     NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(date, env)
);

-- Tabel contact clicks
CREATE TABLE IF NOT EXISTS contact_clicks (
  id         BIGSERIAL PRIMARY KEY,
  date       DATE        NOT NULL,
  env        TEXT        NOT NULL DEFAULT 'production',
  email      INTEGER     NOT NULL DEFAULT 0,
  whatsapp   INTEGER     NOT NULL DEFAULT 0,
  address    INTEGER     NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(date, env)
);

-- Index untuk query performa
CREATE INDEX IF NOT EXISTS idx_page_views_date_env    ON page_views(date, env);
CREATE INDEX IF NOT EXISTS idx_contact_clicks_date_env ON contact_clicks(date, env);

-- Aktifkan Row Level Security
ALTER TABLE page_views     ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_clicks ENABLE ROW LEVEL SECURITY;

-- Policy: izinkan semua operasi tanpa auth (portfolio public site)
CREATE POLICY "Allow all page_views"     ON page_views     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all contact_clicks" ON contact_clicks FOR ALL USING (true) WITH CHECK (true);
