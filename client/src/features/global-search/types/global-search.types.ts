import type { Note } from "@/features/notes/types/note.types";

export type GlobalSearchMatchField = "title" | "preview" | "folder" | "tag";

export type GlobalSearchResult = {
  note: Note;
  matchedField: GlobalSearchMatchField;
  score: number;
};

export type GlobalSearchStatus =
  | "idle"
  | "loading"
  | "ready"
  | "empty"
  | "error";
