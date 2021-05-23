import useSWR from "swr";
import { fetchStrapiAPI } from "../lib/api";

export function useEvents() {
  const { data, error } = useSWR("/events", fetchStrapiAPI);

  return {
    events: data,
    isLoading: !data && !error,
    isError: error,
  };
}
