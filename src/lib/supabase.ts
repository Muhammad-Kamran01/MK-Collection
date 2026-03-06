import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uevxdpakuoyjdhluyivg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_XqbrLC2QAQWPMtXM7BVJlw_dBcdVgd4';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials missing in .env. Using default fallback credentials.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
