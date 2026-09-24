import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Environment: dev vs production data terpisah
// Di dev: env = "development", di production Vercel: env = "production"
export function getEnv(): 'development' | 'production' {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') return 'production';
  if (process.env.NEXT_PUBLIC_APP_ENV === 'development') return 'development';
  // Auto-detect: di Vercel production NODE_ENV = production
  if (process.env.NODE_ENV === 'production') return 'production';
  return 'development';
}
