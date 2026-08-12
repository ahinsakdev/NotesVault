import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import type { GlobalSearchStatus } from "@/features/global-search/types/global-search.types";
import { useNotes } from "@/features/notes/hooks/use-notes";
import { getNotesFilterOptions } from "@/features/notes/utils/note.utils";

import type { SearchPageFilters } from "../types/search.types";
import { useSearchNotes } from "./use-search-notes";

const initialFilters: SearchPageFilters = {
  folder: "all",
  tag: "all",
  sort: "relevance",
  view: "grid",
  favoritesOnly: false,
  pinnedOnly: false,
};

export function useSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchPageFilters>(initialFilters);

  const query = searchParams.get("q") ?? "";

  const { data: notes = [] } = useNotes();

  const filterOptions = useMemo(
    () => getNotesFilterOptions(notes),
    [notes],
  );

  const searchQuery = useSearchNotes({
    query,
    folder: filters.folder === "all" ? undefined : filters.folder,
    tag: filters.tag === "all" ? undefined : filters.tag,
    sort: filters.sort,
    favoritesOnly: filters.favoritesOnly || undefined,
    pinnedOnly: filters.pinnedOnly || undefined,
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

  const hasActiveFilters =
    filters.folder !== "all" ||
    filters.tag !== "all" ||
    filters.sort !== "relevance" ||
    filters.favoritesOnly ||
    filters.pinnedOnly;

  const updateQuery = useCallback(
    (value: string) => {
      const nextSearchParams = new URLSearchParams(searchParams);
      const normalizedValue = value.trimStart();

      if (normalizedValue) {
        nextSearchParams.set("q", normalizedValue);
      } else {
        nextSearchParams.delete("q");
      }

      setSearchParams(nextSearchParams, {
        replace: true,
      });
    },
    [searchParams, setSearchParams],
  );

  const setFolder = useCallback((folder: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      folder,
    }));
  }, []);

  const setTag = useCallback((tag: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      tag,
    }));
  }, []);

  const setSort = useCallback((sort: SearchPageFilters["sort"]) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      sort,
    }));
  }, []);

  const setView = useCallback((view: SearchPageFilters["view"]) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      view,
    }));
  }, []);

  const setFavoritesOnly = useCallback((favoritesOnly: boolean) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      favoritesOnly,
    }));
  }, []);

  const setPinnedOnly = useCallback((pinnedOnly: boolean) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      pinnedOnly,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters((currentFilters) => ({
      ...initialFilters,
      view: currentFilters.view,
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchParams({}, { replace: true });

    setFilters((currentFilters) => ({
      ...initialFilters,
      view: currentFilters.view,
    }));
  }, [setSearchParams]);

  return {
    clearFilters,
    clearSearch,
    filterOptions,
    filters,
    hasActiveFilters,
    query,
    refetch: searchQuery.refetch,
    results,
    setFavoritesOnly,
    setFolder,
    setPinnedOnly,
    setSort,
    setTag,
    setView,
    status,
    updateQuery,
  };
}
