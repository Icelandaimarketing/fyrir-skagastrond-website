import { createClient } from '@supabase/supabase-js';

// Public keys — safe to hardcode (anon key is read-only by design)
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://yestlkukcdjlrtvxugkg.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inllc3Rsa3VrY2RqbHJ0dnh1Z2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjI3OTAsImV4cCI6MjA5MTgzODc5MH0.J4_OAHHUFAsTlD18LW-9co7GOaIMP0QGtnPVrZ-2QfA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
