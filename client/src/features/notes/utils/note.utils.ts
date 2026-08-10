import type {
  Note,
  NotesFilterOptions,
  NotesFilters,
} from "../types/note.types";

export function getNotesFilterOptions(notes: Note[]): NotesFilterOptions {
  const folders = [...new Set(notes.map((note) => note.folderName))].sort(
    (first, second) => first.localeCompare(second),
  );

  const tags = [...new Set(notes.flatMap((note) => note.tags))].sort(
    (first, second) => first.localeCompare(second),
  );

  return {
    folders,
    tags,
  };
}

export function filterAndSortNotes(
  notes: Note[],
  filters: NotesFilters,
): Note[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  const filteredNotes = notes.filter((note) => {
    if (note.deletedAt || note.isArchived) {
      return false;
    }

    const matchesSearch =
      normalizedSearch.length === 0 ||
      note.title.toLowerCase().includes(normalizedSearch) ||
      note.preview.toLowerCase().includes(normalizedSearch) ||
      note.folderName.toLowerCase().includes(normalizedSearch) ||
      note.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

    const matchesFolder =
      filters.folder === "all" || note.folderName === filters.folder;

    const matchesTag = filters.tag === "all" || note.tags.includes(filters.tag);

    return matchesSearch && matchesFolder && matchesTag;
  });

  return [...filteredNotes].sort((first, second) => {
    switch (filters.sort) {
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

      case "updated-desc":
      default:
        return (
          new Date(second.updatedAt).getTime() -
          new Date(first.updatedAt).getTime()
        );
    }
  });
}

export function formatNoteDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
