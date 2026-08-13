import { useMutation, useQueryClient } from "@tanstack/react-query";

import { emptyTrash } from "@/features/notes/api/notes.api";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";
import { searchQueryKeys } from "@/features/search/hooks/use-search-notes";

export function useEmptyTrash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emptyTrash,

    onSuccess: async () => {
      queryClient.setQueryData(
        notesQueryKeys.trash(),
        [],
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
