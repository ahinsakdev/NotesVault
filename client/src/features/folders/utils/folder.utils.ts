import type { Note } from "@/features/notes/types/note.types";

import type {
  Folder,
  FolderSummary,
} from "../types/folder.types";

export function createFolderSummaries(
  folders: Folder[],
  notes: Note[],
): FolderSummary[] {
  const activeNotes = notes.filter(
    (note) => !note.deletedAt && !note.isArchived,
  );

  return folders
    .map((folder) => {
      const folderNotes = activeNotes.filter(
        (note) => note.folderId === folder.id,
      );

      const latestNoteUpdatedAt = folderNotes.reduce<string | null>(
        (latest, note) => {
          if (!latest) {
            return note.updatedAt;
          }

          return new Date(note.updatedAt).getTime() >
            new Date(latest).getTime()
            ? note.updatedAt
            : latest;
        },
        null,
      );

      return {
        id: folder.id,
        name: folder.name,
        noteCount: folderNotes.length,
        createdAt: folder.createdAt,
        updatedAt: latestNoteUpdatedAt ?? folder.updatedAt,
      };
    })
    .sort((first, second) =>
      first.name.localeCompare(second.name),
    );
}
