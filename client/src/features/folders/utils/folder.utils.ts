import type { Note } from "@/features/notes/types/note.types";

import type { FolderSummary } from "../types/folder.types";

export function getFoldersFromNotes(notes: Note[]): FolderSummary[] {
  const folders = new Map<string, FolderSummary>();

  notes.forEach((note) => {
    if (note.deletedAt || note.isArchived) {
      return;
    }

    const existingFolder = folders.get(note.folderId);

    if (!existingFolder) {
      folders.set(note.folderId, {
        id: note.folderId,
        name: note.folderName,
        noteCount: 1,
        updatedAt: note.updatedAt,
      });

      return;
    }

    existingFolder.noteCount += 1;

    if (
      new Date(note.updatedAt).getTime() >
      new Date(existingFolder.updatedAt).getTime()
    ) {
      existingFolder.updatedAt = note.updatedAt;
    }
  });

  return [...folders.values()].sort((first, second) =>
    first.name.localeCompare(second.name),
  );
}
