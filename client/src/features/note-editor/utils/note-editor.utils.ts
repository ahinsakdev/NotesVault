import type { JSONContent } from "@tiptap/react";

import { DEFAULT_NOTE_FOLDER } from "@/features/folders/constants/folder.constants";
import type { Note } from "@/features/notes/types/note.types";

import type { NoteEditorValues } from "../types/note-editor.types";

function createParagraphDocument(text = ""): JSONContent {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    type: "doc",
    content:
      paragraphs.length > 0
        ? paragraphs.map((paragraph) => ({
            type: "paragraph",
            content: [
              {
                type: "text",
                text: paragraph,
              },
            ],
          }))
        : [
            {
              type: "paragraph",
            },
          ],
  };
}

export function createEmptyNoteEditorValues(): NoteEditorValues {
  return {
    title: "",
    content: createParagraphDocument(),
    folderName: DEFAULT_NOTE_FOLDER,
    tags: [],
    isPinned: false,
    isFavorite: false,
    isArchived: false,
  };
}

export function createNoteEditorValues(note: Note): NoteEditorValues {
  return {
    title: note.title,
    content: note.content,
    folderName: note.folderName,
    tags: [...note.tags],
    isPinned: note.isPinned,
    isFavorite: note.isFavorite,
    isArchived: note.isArchived,
  };
}
