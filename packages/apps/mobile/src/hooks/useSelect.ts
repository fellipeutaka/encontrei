import { useMemo } from "react";

import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";

import { supabase } from "@encontrei/lib/supabase";

import type {
  PostgrestSingleSuccessResponse,
  PostgrestSuccessResponse,
  Query,
  QueryConfig,
} from "./useQuery";

export type Fetcher<Data> = (
  table: string,
  config: QueryConfig<Data>
) => Promise<PostgrestSuccessResponse<Data>>;
export type FetcherSingle<Data> = (
  table: string,
  config: QueryConfig<Data>
) => Promise<PostgrestSingleSuccessResponse<Data>>;

type FetcherType = "multiple" | "single" | "maybeSingle" | "csv";

function createFetcher(client: SupabaseClient, type: FetcherType) {
  return async (table: string, config: QueryConfig<any>) => {
    const select = client.from(table).select(config.columns, {
      count: config.count,
      head: config.head,
    });
    const hasFilter = typeof config.filter === "function";
    const query = hasFilter ? config.filter?.(select) : select;
    switch (type) {
      case "multiple":
        return await query?.throwOnError();
      case "single":
        return await query?.throwOnError().single();
      case "maybeSingle":
        return await query?.throwOnError().maybeSingle();
      case "csv":
        return await query?.throwOnError().csv();
    }
  };
}

function useFetcher<Data>(type: "multiple"): Fetcher<Data>;
function useFetcher<Data>(type: "single"): FetcherSingle<Data>;
function useFetcher<Data>(type: "maybeSingle"): FetcherSingle<Data | null>;
function useFetcher(type: "csv"): FetcherSingle<string>;
function useFetcher(type: FetcherType) {
  return useMemo(() => createFetcher(supabase, type), [supabase, type]) as any;
}

export function useSelect<Data>(
  query: Query<Data>,
  swrConfig: Omit<SWRConfiguration, "fetcher">
): SWRResponse<PostgrestSuccessResponse<Data>, PostgrestError> {
  const fetcher = useFetcher<Data>("multiple");
  return useSWR(query, fetcher, swrConfig);
}
