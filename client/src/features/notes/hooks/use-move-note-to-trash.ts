import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveNoteToTrash } from "../api/notes.api";
import { notesQueryKeys } from "./use-notes";

export function useMoveNoteToTrash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveNoteToTrash,
    onSuccess: async (_, noteId) => {
      queryClient.removeQueries({
        queryKey: notesQueryKeys.detail(noteId),
      });

      await queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      });
    },
  });
}
