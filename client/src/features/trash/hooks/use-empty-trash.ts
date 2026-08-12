import { useMutation, useQueryClient } from "@tanstack/react-query";

import { emptyTrash } from "@/features/notes/api/notes.api";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";

export function useEmptyTrash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emptyTrash,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      });
    },
  });
}
