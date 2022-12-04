import { useQuery } from "supabase-swr";

import type { Inventory } from "@encontrei/@types/Inventory";
import type { InventoryFound } from "@encontrei/@types/InventoryFound";
import type { InventoryWithdraw } from "@encontrei/@types/InventoryWithdraw";
import type { InventoryWithdrawAccepted } from "@encontrei/@types/InventoryWithdrawAccepted";
import type { Table } from "@encontrei/@types/Table";

export function getItems(table: Table) {
  if (table === "inventory") {
    return useQuery<Inventory>(table, {}, []);
  }
  if (table === "inventoryWithdraw") {
    return useQuery<InventoryWithdraw>(
      table,
      {
        columns:
          "id, requestedAt, user:userId ( id, email, raw_user_meta_data->name ), inventory:inventoryId ( * )",
      },
      []
    );
  }
  if (table === "inventoryFound") {
    return useQuery<InventoryFound>(
      table,
      {
        columns: "*, user:userId ( email, raw_user_meta_data->name )",
      },
      []
    );
  }
  if (table === "inventoryWithdrawAccepted") {
    return useQuery<InventoryWithdrawAccepted>(
      table,
      {
        columns: "*, user:userId ( email, raw_user_meta_data->name )",
      },
      []
    );
  }
  throw new Error("Invalid Table");
}
