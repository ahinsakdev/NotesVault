import { useCallback, useMemo, useState } from "react";

import { useSearchNotes } from "@/features/search/hooks/use-search-notes";

import type { GlobalSearchStatus } from "../types/global-search.types";

const GLOBAL_SEARCH_RESULT_LIMIT = 8;

export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchQuery = useSearchNotes({
    query,
    sort: "relevance",
    limit: GLOBAL_SEARCH_RESULT_LIMIT,
  });

  const results = searchQuery.data ?? [];

  const status = useMemo<GlobalSearchStatus>(() => {
    if (!query.trim()) {
      return "idle";
    }

    if (searchQuery.isLoading) {
      return "loading";
    }

    if (searchQuery.isError) {
      return "error";
    }

    if (results.length === 0) {
      return "empty";
    }

    return "ready";
  }, [
    query,
    results.length,
    searchQuery.isError,
    searchQuery.isLoading,
  ]);

  const openSearch = useCallback(() => {
    setIsOpen(true);
    setSelectedIndex(0);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const updateQuery = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  }, []);

  const selectNextResult = useCallback(() => {
    if (results.length === 0) {
      return;
    }

    setSelectedIndex((currentIndex) =>
      currentIndex >= results.length - 1 ? 0 : currentIndex + 1,
    );
  }, [results.length]);

  const selectPreviousResult = useCallback(() => {
    if (results.length === 0) {
      return;
    }

    setSelectedIndex((currentIndex) =>
      currentIndex <= 0 ? results.length - 1 : currentIndex - 1,
    );
  }, [results.length]);

  return {
    closeSearch,
    isOpen,
    openSearch,
    query,
    refetch: searchQuery.refetch,
    results,
    selectedIndex,
    selectNextResult,
    selectPreviousResult,
    setSelectedIndex,
    status,
    updateQuery,
  };
}
