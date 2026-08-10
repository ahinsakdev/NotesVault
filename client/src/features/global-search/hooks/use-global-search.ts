import { useCallback, useMemo, useState } from "react";

import { useNotes } from "@/features/notes/hooks/use-notes";

import type { GlobalSearchStatus } from "../types/global-search.types";
import { searchNotesGlobally } from "../utils/global-search.utils";

export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const results = useMemo(
    () => searchNotesGlobally(notes, query),
    [notes, query],
  );

  const status = useMemo<GlobalSearchStatus>(() => {
    if (!query.trim()) {
      return "idle";
    }

    if (isLoading) {
      return "loading";
    }

    if (isError) {
      return "error";
    }

    if (results.length === 0) {
      return "empty";
    }

    return "ready";
  }, [isError, isLoading, query, results.length]);

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
    refetch,
    results,
    selectedIndex,
    selectNextResult,
    selectPreviousResult,
    setSelectedIndex,
    status,
    updateQuery,
  };
}
