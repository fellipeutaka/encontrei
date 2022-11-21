import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Supabase URL is missing in .env file");
} else if (!supabaseAnonKey) {
  throw new Error("Supabase anon key is missing in .env file");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});
