import { supabase } from "@encontrei/lib/supabase";

export async function deleteFileByPath(path: string) {
  const { error: removeError } = await supabase.storage
    .from("item-photo")
    .remove([path]);

  if (removeError) throw removeError;
}
