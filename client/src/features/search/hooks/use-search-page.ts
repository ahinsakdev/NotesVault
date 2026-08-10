import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import type {
  GlobalSearchResult,
  GlobalSearchStatus,
} from "@/features/global-search/types/global-search.types";
import { searchNotesGlobally } from "@/features/global-search/utils/global-search.utils";
import { useNotes } from "@/features/notes/hooks/use-notes";
import type { Note } from "@/features/notes/types/note.types";
import { getNotesFilterOptions } from "@/features/notes/utils/note.utils";

import type {
  SearchPageFilters,
  SearchPageSortOption,
} from "../types/search.types";

const initialFilters: SearchPageFilters = {
  folder: "all",
  tag: "all",
  sort: "relevance",
  view: "grid",
  favoritesOnly: false,
  pinnedOnly: false,
};

function sortSearchResults(
  results: GlobalSearchResult[],
  sort: SearchPageSortOption,
): GlobalSearchResult[] {
  if (sort === "relevance") {
    return results;
  }

  return [...results].sort((firstResult, secondResult) => {
    const first = firstResult.note;
    const second = secondResult.note;

    switch (sort) {
      case "updated-desc":
        return (
          new Date(second.updatedAt).getTime() -
          new Date(first.updatedAt).getTime()
        );

      case "updated-asc":
        return (
          new Date(first.updatedAt).getTime() -
          new Date(second.updatedAt).getTime()
        );

      case "created-desc":
        return (
          new Date(second.createdAt).getTime() -
          new Date(first.createdAt).getTime()
        );

      case "created-asc":
        return (
          new Date(first.createdAt).getTime() -
          new Date(second.createdAt).getTime()
        );

      case "title-asc":
        return first.title.localeCompare(second.title);

      case "title-desc":
        return second.title.localeCompare(first.title);

      default:
        return 0;
    }
  });
}

function matchesSearchFilters(note: Note, filters: SearchPageFilters): boolean {
  if (filters.folder !== "all" && note.folderName !== filters.folder) {
    return false;
  }

  if (filters.tag !== "all" && !note.tags.includes(filters.tag)) {
    return false;
  }

  if (filters.favoritesOnly && !note.isFavorite) {
    return false;
  }

  if (filters.pinnedOnly && !note.isPinned) {
    return false;
  }

  return true;
}

export function useSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchPageFilters>(initialFilters);

  const query = searchParams.get("q") ?? "";

  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const filterOptions = useMemo(() => getNotesFilterOptions(notes), [notes]);

  const rankedResults = useMemo(
    () => searchNotesGlobally(notes, query, Number.MAX_SAFE_INTEGER),
    [notes, query],
  );

  const results = useMemo(() => {
    const filteredResults = rankedResults.filter((result) =>
      matchesSearchFilters(result.note, filters),
    );

    return sortSearchResults(filteredResults, filters.sort);
  }, [filters, rankedResults]);

  const resultNotes = useMemo(
    () => results.map((result) => result.note),
    [results],
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

  const setSort = useCallback((sort: SearchPageSortOption) => {
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
    rankedResults,
    refetch,
    resultNotes,
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
