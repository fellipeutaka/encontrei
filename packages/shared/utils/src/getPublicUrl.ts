import type { SupabaseClient } from "@supabase/supabase-js";

export function getPublicUrl(supabase: SupabaseClient, path: string) {
  const { publicURL } = supabase.storage.from("item-photo").getPublicUrl(path);
  return publicURL ?? "";
}
