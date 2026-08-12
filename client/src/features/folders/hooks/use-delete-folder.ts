import { useMutation, useQueryClient } from "@tanstack/react-query";

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

      await queryClient.invalidateQueries({
        queryKey: foldersQueryKeys.all,
      });
    },
  });
}
