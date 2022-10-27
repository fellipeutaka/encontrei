import { supabase } from "@encontrei/lib/supabase";

import { deleteFileByPath } from "./deleteFile";

interface DeleteItemParams {
  from: string;
  id: string;
  photoFilename?: string;
}

export async function deleteItemById({
  from,
  id,
  photoFilename,
}: DeleteItemParams) {
  await supabase.from(from).delete().match({ id }).throwOnError();
  if (photoFilename) {
    await deleteFileByPath(`${from}/${photoFilename}`);
  }
}
