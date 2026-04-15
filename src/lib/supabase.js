import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yestlkukcdjlrtvxugkg.supabase.co';
const supabaseKey = 'sb_publishable_OhlRfhCrs0AjE8CS7F6v8g_UXflDfKl';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
