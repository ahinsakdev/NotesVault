import type { NoteAccent } from "../constants/note.constants.js";
import type { NoteContentNode } from "../types/note-content.types.js";

type SerializableNote = {
  _id: {
    toString(): string;
  };
  title: string;
  content: NoteContentNode;
  preview: string;
  folderName: string;
  tags: string[];
  accent: NoteAccent;
  isPinned: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SerializedNote = {
  id: string;
  title: string;
  content: NoteContentNode;
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

export function serializeNote(note: SerializableNote): SerializedNote {
  return {
    id: note._id.toString(),
    title: note.title,
    content: note.content,
    preview: note.preview,
    folderId: note.folderName,
    folderName: note.folderName,
    tags: [...note.tags],
    accent: note.accent,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
    isPinned: note.isPinned,
    isFavorite: note.isFavorite,
    isArchived: note.isArchived,
    deletedAt: note.deletedAt
      ? note.deletedAt.toISOString()
      : null,
  };
}
