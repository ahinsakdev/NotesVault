import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notesQueryKeys } from "@/features/notes/hooks/use-notes";

import { deleteTag } from "../api/tags.api";

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      });
    },
  });
}
