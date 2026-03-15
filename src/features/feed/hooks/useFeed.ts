import { useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetFeedQuery } from "@/features/feed/api/feed.api";

export const useFeed = (searchTerm = "") => {
  const { data = [], ...queryState } = useGetFeedQuery(undefined);
  const debouncedSearch = useDebounce(searchTerm, 250);

  const items = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return data;
    }

    const normalized = debouncedSearch.trim().toLowerCase();
    return data.filter((item) => {
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.summary.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalized))
      );
    });
  }, [data, debouncedSearch]);

  return {
    ...queryState,
    items,
  };
};
