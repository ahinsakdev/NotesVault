import { useMutation, useQueryClient } from "@tanstack/react-query";

import { permanentlyDeleteNote } from "@/features/notes/api/notes.api";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";

export function usePermanentlyDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permanentlyDeleteNote,
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
