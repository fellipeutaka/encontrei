import { useMemo } from "react";

import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export type Count = "exact" | "planned" | "estimated";

export type Filter<Data> = (
  query: PostgrestFilterBuilder<Data>
) => PostgrestFilterBuilder<Data>;

export type PostgrestError = {
  message: string;
  details: string;
  hint: string;
  code: string;
};

export type PostgrestSuccessResponse<Data> = {
  status?: number;
  statusText?: string;
  data: Data[];
  count: number | null;
};

export type PostgrestSingleSuccessResponse<Data> = {
  status?: number;
  statusText?: string;
  data: Data;
  count: number | null;
};
export type Returning = "minimal" | "representation";

export type QueryConfig<Data> = {
  columns?: string;
  filter?: Filter<Data>;
  count?: Count;
  head?: boolean;
};
export type Query<Data> = [string, QueryConfig<Data>];
export const createQuery = <Data>(
  table: string,
  config: QueryConfig<Data>
): Query<Data> => [table, config];

export function useQuery<Data>(
  table: string,
  config: QueryConfig<Data>,
  deps: any[]
) {
  return useMemo(() => createQuery(table, config), deps);
}
