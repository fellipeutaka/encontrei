import { Query, useSelect } from "supabase-swr";

export function useFetch<T>(query: Query<T>) {
  const { data, error, mutate } = useSelect(query, {});
  const isLoading = !data?.data && !error;

  return {
    response: data,
    error,
    mutate,
    isLoading,
  };
}
