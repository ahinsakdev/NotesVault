import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notesQueryKeys } from "@/features/notes/hooks/use-notes";

import {
  renameTag,
  type RenameTagInput,
} from "../api/tags.api";

type RenameTagVariables = {
  tagName: string;
  input: RenameTagInput;
};

export function useRenameTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ input, tagName }: RenameTagVariables) =>
      renameTag(tagName, input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      });
    },
  });
}
