import type { JSONContent } from "@tiptap/react";

import type { Note } from "@/features/notes/types/note.types";

export type NoteEditorSaveState = "idle" | "unsaved" | "saving" | "saved";

export type NoteEditorValues = {
  title: string;
  content: JSONContent;
  folderName: string;
  tags: string[];
  isPinned: boolean;
  isFavorite: boolean;
};

export type NoteEditorState = {
  values: NoteEditorValues;
  originalNote: Note | null;
  saveState: NoteEditorSaveState;
  isNewNote: boolean;
};

export type NoteEditorExportHandler = () => void;