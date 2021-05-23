import useSWR from "swr";
import { fetchStrapiAPI } from "../lib/api";

export function useCities() {
  const { data, error } = useSWR("/cities", fetchStrapiAPI);
  return {
    events: data,
    isLoading: !data && !error,
    isError: error,
  };
}
