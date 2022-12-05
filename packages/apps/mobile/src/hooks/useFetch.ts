import { Query } from "./useQuery";
import { useSelect } from "./useSelect";

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
