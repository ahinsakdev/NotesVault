import { useQuery } from "@tanstack/react-query";

import { getFolderById } from "../api/folders.api";
import { foldersQueryKeys } from "./use-folders";

export function useFolder(folderId: string | undefined) {
  return useQuery({
    queryKey: foldersQueryKeys.detail(folderId ?? "missing"),
    queryFn: () => getFolderById(folderId as string),
    enabled: Boolean(folderId),
  });
}
