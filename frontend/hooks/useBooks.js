import useSWR from "swr";
import { fetchStrapiAPI } from "../lib/api";

export function useBooks() {
  const { data, error } = useSWR("/books", fetchStrapiAPI);
  return {
    books: data,
    isLoading: !data && !error,
    isError: error,
  };
}
