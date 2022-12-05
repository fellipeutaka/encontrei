import { useQuery } from "supabase-swr";

import type { Table } from "@encontrei/shared-constants";

export function getItems<T>(table: Table) {
  if (table === "inventory") {
    return useQuery<T>(table, {}, []);
  }
  if (table === "inventoryWithdraw") {
    return useQuery<T>(
      table,
      {
        columns:
          "id, requestedAt, user:userId ( id, email, raw_user_meta_data->name ), inventory:inventoryId ( * )",
      },
      []
    );
  }
  if (table === "inventoryFound") {
    return useQuery<T>(
      table,
      {
        columns: "*, user:userId ( email, raw_user_meta_data->name )",
      },
      []
    );
  }
  if (table === "inventoryWithdrawAccepted") {
    return useQuery<T>(
      table,
      {
        columns: "*, user:userId ( email, raw_user_meta_data->name )",
      },
      []
    );
  }
  throw new Error("Invalid Table");
}
