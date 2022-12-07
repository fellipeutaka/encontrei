import { useQuery } from "@encontrei/hooks/useQuery";
import { supabase } from "@encontrei/lib/supabase";
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
    const userId = supabase.auth.user()?.id;

    return useQuery<T>(
      table,
      {
        columns: "*, user:userId ( email, raw_user_meta_data->name )",
        filter: (query) => query.match({ userId, isVisible: true }),
      },
      []
    );
  }
  if (table === "inventoryWithdrawRefused") {
    const userId = supabase.auth.user()?.id;

    return useQuery<T>(
      table,
      {
        columns: "*, user:userId ( email, raw_user_meta_data->name )",
        filter: (query) => query.match({ userId, isVisible: true }),
      },
      []
    );
  }
  throw new Error("Invalid Table");
}
