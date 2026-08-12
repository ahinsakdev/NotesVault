import { useMutation, useQueryClient } from "@tanstack/react-query";

import { restoreNote } from "@/features/notes/api/notes.api";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";

export function useRestoreNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restoreNote,
    onSuccess: async (note) => {
      queryClient.setQueryData(
        notesQueryKeys.detail(note.id),
        note,
      );

      await queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      });
    },
  });
}
