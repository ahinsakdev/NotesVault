import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNote } from "../api/notes.api";
import type { Note } from "../types/note.types";
import { notesQueryKeys } from "./use-notes";

type UpdateNoteStateVariables = {
  noteId: string;
  updates: Partial<
    Pick<Note, "isPinned" | "isFavorite" | "isArchived">
  >;
};

function replaceNote(notes: Note[] | undefined, updatedNote: Note) {
  if (!notes) {
    return notes;
  }

  return notes.map((note) =>
    note.id === updatedNote.id ? updatedNote : note,
  );
}

function removeNote(notes: Note[] | undefined, noteId: string) {
  if (!notes) {
    return notes;
  }

  return notes.filter((note) => note.id !== noteId);
}

function addOrReplaceNote(notes: Note[] | undefined, updatedNote: Note) {
  if (!notes) {
    return [updatedNote];
  }

  const existingIndex = notes.findIndex(
    (note) => note.id === updatedNote.id,
  );

  if (existingIndex === -1) {
    return [updatedNote, ...notes];
  }

  return replaceNote(notes, updatedNote);
}

export function useUpdateNoteState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, updates }: UpdateNoteStateVariables) =>
      updateNote(noteId, updates),

    onSuccess: async (note, variables) => {
      queryClient.setQueryData(
        notesQueryKeys.detail(note.id),
        note,
      );

      if (variables.updates.isArchived !== undefined) {
        if (note.isArchived) {
          queryClient.setQueryData<Note[]>(
            notesQueryKeys.list(),
            (notes) => removeNote(notes, note.id),
          );

          queryClient.setQueryData<Note[]>(
            notesQueryKeys.archived(),
            (notes) => addOrReplaceNote(notes, note),
          );
        } else {
          queryClient.setQueryData<Note[]>(
            notesQueryKeys.archived(),
            (notes) => removeNote(notes, note.id),
          );

          queryClient.setQueryData<Note[]>(
            notesQueryKeys.list(),
            (notes) => addOrReplaceNote(notes, note),
          );
        }
      } else {
        queryClient.setQueryData<Note[]>(
          notesQueryKeys.list(),
          (notes) => replaceNote(notes, note),
        );

        queryClient.setQueryData<Note[]>(
          notesQueryKeys.archived(),
          (notes) => replaceNote(notes, note),
        );
      }

      await queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      });
    },
  });
}
