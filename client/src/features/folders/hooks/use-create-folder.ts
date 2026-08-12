import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFolder } from "../api/folders.api";
import { foldersQueryKeys } from "./use-folders";

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onSuccess: async (folder) => {
      queryClient.setQueryData(
        foldersQueryKeys.detail(folder.id),
        folder,
      );

      await queryClient.invalidateQueries({
        queryKey: foldersQueryKeys.all,
      });
    },
  });
}
