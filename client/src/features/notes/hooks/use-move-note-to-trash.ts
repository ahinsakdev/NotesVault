import { useMutation, useQueryClient } from "@tanstack/react-query";

import { searchQueryKeys } from "@/features/search/hooks/use-search-notes";

import { moveNoteToTrash } from "../api/notes.api";
import type { Note } from "../types/note.types";
import { notesQueryKeys } from "./use-notes";

function removeNote(notes: Note[] | undefined, noteId: string) {
  if (!notes) {
    return notes;
  }

  return notes.filter((note) => note.id !== noteId);
}

export function useMoveNoteToTrash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveNoteToTrash,

    onSuccess: async (_, noteId) => {
      queryClient.removeQueries({
        queryKey: notesQueryKeys.detail(noteId),
      });

      queryClient.setQueryData<Note[]>(
        notesQueryKeys.list(),
        (notes) => removeNote(notes, noteId),
      );

      queryClient.setQueryData<Note[]>(
        notesQueryKeys.archived(),
        (notes) => removeNote(notes, noteId),
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
