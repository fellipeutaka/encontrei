export function getPublicUrl(supabase, path: string) {
  const { publicURL } = supabase.storage.from("item-photo").getPublicUrl(path);
  return publicURL ?? "";
}
