import { useMemo } from "react";

import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";

import { supabase } from "@encontrei/lib/supabase";

import type { PostgrestSuccessResponse, Query, QueryConfig } from "./useQuery";

function createFetcher<T>(client: SupabaseClient) {
  return async (table: string, config: QueryConfig<T>) => {
    const select = client.from(table).select(config.columns, {
      count: config.count,
      head: config.head,
    });
    const hasFilter = typeof config.filter === "function";
    const query = hasFilter ? config.filter?.(select) : select;
    return await query?.throwOnError();
  };
}

function useFetcher<T>() {
  return useMemo(() => createFetcher<T>(supabase), [supabase]);
}

export function useSelect<Data>(
  query: Query<Data>,
  swrConfig: Omit<SWRConfiguration, "fetcher">
): SWRResponse<PostgrestSuccessResponse<Data>, PostgrestError> {
  const fetcher = useFetcher<Data>();
  return useSWR(query, fetcher, swrConfig);
}
