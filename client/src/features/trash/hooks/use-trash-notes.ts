import { useMemo, useState } from "react";

import type { Note } from "@/features/notes/types/note.types";

export function useTrashNotes(notes: Note[]) {
  const deletedNotes = useMemo(
    () =>
      notes
        .filter((note) => note.deletedAt !== null)
        .toSorted(
          (first, second) =>
            new Date(second.deletedAt ?? 0).getTime() -
            new Date(first.deletedAt ?? 0).getTime(),
        ),
    [notes],
  );

  const [restoredNoteIds, setRestoredNoteIds] = useState<string[]>([]);
  const [permanentlyDeletedNoteIds, setPermanentlyDeletedNoteIds] = useState<
    string[]
  >([]);

  const visibleTrashNotes = useMemo(
    () =>
      deletedNotes.filter(
        (note) =>
          !restoredNoteIds.includes(note.id) &&
          !permanentlyDeletedNoteIds.includes(note.id),
      ),
    [deletedNotes, permanentlyDeletedNoteIds, restoredNoteIds],
  );

  function restoreNote(noteId: string) {
    setRestoredNoteIds((currentIds) =>
      currentIds.includes(noteId) ? currentIds : [...currentIds, noteId],
    );
  }

  function permanentlyDeleteNote(noteId: string) {
    setPermanentlyDeletedNoteIds((currentIds) =>
      currentIds.includes(noteId) ? currentIds : [...currentIds, noteId],
    );
  }

  function emptyTrash() {
    setPermanentlyDeletedNoteIds((currentIds) => {
      const nextIds = new Set(currentIds);

      visibleTrashNotes.forEach((note) => {
        nextIds.add(note.id);
      });

      return [...nextIds];
    });
  }

  return {
    deletedNoteCount: deletedNotes.length,
    emptyTrash,
    permanentlyDeleteNote,
    restoreNote,
    visibleTrashNotes,
  };
}
