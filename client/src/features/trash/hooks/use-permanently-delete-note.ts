import { useMutation, useQueryClient } from "@tanstack/react-query";

import { permanentlyDeleteNote } from "@/features/notes/api/notes.api";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";
import type { Note } from "@/features/notes/types/note.types";
import { searchQueryKeys } from "@/features/search/hooks/use-search-notes";

export function usePermanentlyDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permanentlyDeleteNote,

    onSuccess: async (_, noteId) => {
      queryClient.removeQueries({
        queryKey: notesQueryKeys.detail(noteId),
      });

      queryClient.setQueryData<Note[]>(
        notesQueryKeys.trash(),
        (notes) => notes?.filter((note) => note.id !== noteId),
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
