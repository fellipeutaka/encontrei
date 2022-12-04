import { supabase } from "@encontrei/lib/supabase";

import { deleteFileByPath } from "./deleteFile";

type MoveFileParams = {
  from: string;
  to: string;
}

export async function moveFile({ from, to }: MoveFileParams) {
  const { error: copyError } = await supabase.storage
    .from("item-photo")
    .copy(from, to);

  if (copyError) throw copyError;

  await deleteFileByPath(from);
}
