import { useMemo, useState } from "react";

import {
  filterAndSortNotes,
  getNotesFilterOptions,
  type NotesCollectionScope,
} from "../utils/note.utils";
import type {
  Note,
  NotesFilters,
  NotesSortOption,
  NotesViewMode,
} from "../types/note.types";

const initialFilters: NotesFilters = {
  search: "",
  folder: "all",
  tag: "all",
  sort: "updated-desc",
  view: "grid",
};

export function useNotesFilters(
  notes: Note[],
  scope: NotesCollectionScope = "active",
) {
  const [filters, setFilters] = useState<NotesFilters>(initialFilters);

  const filteredNotes = useMemo(
    () => filterAndSortNotes(notes, filters, scope),
    [filters, notes, scope],
  );

  const filterOptions = useMemo(() => getNotesFilterOptions(notes), [notes]);

  const hasActiveFilters =
    filters.search.trim().length > 0 ||
    filters.folder !== "all" ||
    filters.tag !== "all";

  function setSearch(search: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      search,
    }));
  }

  function setFolder(folder: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      folder,
    }));
  }

  function setTag(tag: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      tag,
    }));
  }

  function setSort(sort: NotesSortOption) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      sort,
    }));
  }

  function setView(view: NotesViewMode) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      view,
    }));
  }

  function clearFilters() {
    setFilters((currentFilters) => ({
      ...initialFilters,
      view: currentFilters.view,
    }));
  }

  return {
    filters,
    filteredNotes,
    filterOptions,
    hasActiveFilters,
    setSearch,
    setFolder,
    setTag,
    setSort,
    setView,
    clearFilters,
  };
}
