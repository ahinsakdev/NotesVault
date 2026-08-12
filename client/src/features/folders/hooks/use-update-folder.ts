import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notesQueryKeys } from "@/features/notes/hooks/use-notes";

import {
  updateFolder,
  type UpdateFolderInput,
} from "../api/folders.api";
import { foldersQueryKeys } from "./use-folders";

type UpdateFolderVariables = {
  folderId: string;
  input: UpdateFolderInput;
};

export function useUpdateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ folderId, input }: UpdateFolderVariables) =>
      updateFolder(folderId, input),
    onSuccess: async (folder) => {
      queryClient.setQueryData(
        foldersQueryKeys.detail(folder.id),
        folder,
      );

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
