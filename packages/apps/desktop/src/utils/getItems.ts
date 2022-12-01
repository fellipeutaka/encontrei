import type { Inventory } from "@encontrei/@types/Inventory";
import type { InventoryFound } from "@encontrei/@types/InventoryFound";
import type { InventoryWithdraw } from "@encontrei/@types/InventoryWithdraw";
import type { Table } from "@encontrei/@types/Table";
import { supabase } from "@encontrei/lib/supabase";

export async function getItems(table: Table) {
  if (table === "inventory") {
    const { data } = await supabase
      .from<Inventory>(table)
      .select()
      .throwOnError();
    return data;
  }
  if (table === "inventoryWithdraw") {
    const { data } = await supabase
      .from<InventoryWithdraw>(table)
      .select(
        `
        id,
        requestedAt,
        user:userId ( id, email, raw_user_meta_data->name ),
        inventory:inventoryId ( * )
      `
      )
      .throwOnError();
    return data;
  }
  if (table === "inventoryFound") {
    const { data } = await supabase
      .from<InventoryFound>(table)
      .select(
        `
        *,
        user:userId ( email, raw_user_meta_data->name )
      `
      )
      .throwOnError();
    return data;
  }
  if (table === "inventoryWithdrawAccepted") {
    const { data } = await supabase
      .from<InventoryFound>(table)
      .select(
        `
        *,
        user:userId ( email, raw_user_meta_data->name )
      `
      )
      .throwOnError();
    return data;
  }
  throw new Error("Invalid Table");
}
