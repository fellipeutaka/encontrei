import { supabase } from "@encontrei/lib/supabase";

export async function getItems<T>(
  table:
    | "inventory"
    | "inventoryFound"
    | "inventoryWithdraw"
    | "inventoryWithdrawAccepted"
    | "inventoryWithdrawRefused",
  select?: string
) {
  const { data } = await supabase.from<T>(table).select(select).throwOnError();

  return data;
}
