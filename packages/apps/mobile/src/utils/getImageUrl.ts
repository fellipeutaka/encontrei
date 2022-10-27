import { supabase } from "@encontrei/lib/supabase";

export function getImageUrl(path: string) {
  const { publicURL } = supabase.storage.from("item-photo").getPublicUrl(path);
  return publicURL ?? "";
}
