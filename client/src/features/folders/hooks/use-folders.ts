import { useQuery } from "@tanstack/react-query";

import { getFolders } from "../api/folders.api";

export const foldersQueryKeys = {
  all: ["folders"] as const,
  list: () => [...foldersQueryKeys.all, "list"] as const,
  detail: (folderId: string) =>
    [...foldersQueryKeys.all, "detail", folderId] as const,
};

export function useFolders() {
  return useQuery({
    queryKey: foldersQueryKeys.list(),
    queryFn: getFolders,
  });
}
