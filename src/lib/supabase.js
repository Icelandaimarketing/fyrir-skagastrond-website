import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yestlkukcdjlrtvxugkg.supabase.co';

// Publishable key — safe for client-side use (replaces legacy anon key)
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_OhlRfhCrs0AjE8CS7F6v8g_UXflDfKl';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
