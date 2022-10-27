import { createClient } from "@supabase/supabase-js";

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error("Supabase URL is missing in .env file");
} else if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error("Supabase anon key is missing in .env file");
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});
