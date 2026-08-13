import { useMutation, useQueryClient } from "@tanstack/react-query";

import { restoreNote } from "@/features/notes/api/notes.api";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";
import type { Note } from "@/features/notes/types/note.types";
import { searchQueryKeys } from "@/features/search/hooks/use-search-notes";

function removeNote(notes: Note[] | undefined, noteId: string) {
  if (!notes) {
    return notes;
  }

  return notes.filter((note) => note.id !== noteId);
}

function addOrReplaceNote(notes: Note[] | undefined, restoredNote: Note) {
  if (!notes) {
    return [restoredNote];
  }

  const existingIndex = notes.findIndex(
    (note) => note.id === restoredNote.id,
  );

  if (existingIndex === -1) {
    return [restoredNote, ...notes];
  }

  return notes.map((note) =>
    note.id === restoredNote.id ? restoredNote : note,
  );
}

export function useRestoreNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreNote,

    onSuccess: async (note) => {
      queryClient.setQueryData(
        notesQueryKeys.detail(note.id),
        note,
      );

      queryClient.setQueryData<Note[]>(
        notesQueryKeys.trash(),
        (notes) => removeNote(notes, note.id),
      );

      queryClient.setQueryData<Note[]>(
        notesQueryKeys.archived(),
        (notes) => removeNote(notes, note.id),
      );

      queryClient.setQueryData<Note[]>(
        notesQueryKeys.list(),
        (notes) => addOrReplaceNote(notes, note),
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: notesQueryKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: searchQueryKeys.all,
        }),
      ]);
    },
  });
}
