import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notesQueryKeys } from "@/features/notes/hooks/use-notes";

import { deleteFolder } from "../api/folders.api";
import { foldersQueryKeys } from "./use-folders";

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: async (_, folderId) => {
      queryClient.removeQueries({
        queryKey: foldersQueryKeys.detail(folderId),
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: foldersQueryKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: notesQueryKeys.all,
        }),
      ]);
    },
  });
}
