import type {
  NotesSortOption,
  NotesViewMode,
} from "@/features/notes/types/note.types";

export type SearchPageSortOption = "relevance" | NotesSortOption;

export type SearchPageFilters = {
  folder: string;
  tag: string;
  sort: SearchPageSortOption;
  view: NotesViewMode;
  favoritesOnly: boolean;
  pinnedOnly: boolean;
};
