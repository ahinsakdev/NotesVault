export type NoteAccent = "purple" | "blue" | "green" | "orange" | "red";

export type NotesViewMode = "grid" | "list";

export type NotesSortOption =
  | "updated-desc"
  | "updated-asc"
  | "created-desc"
  | "created-asc"
  | "title-asc"
  | "title-desc";

export type Note = {
  id: string;
  title: string;
  preview: string;
  folderId: string;
  folderName: string;
  tags: string[];
  accent: NoteAccent;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  deletedAt: string | null;
};

export type NotesFilters = {
  search: string;
  folder: string;
  tag: string;
  sort: NotesSortOption;
  view: NotesViewMode;
};

export type NotesFilterOptions = {
  folders: string[];
  tags: string[];
};
