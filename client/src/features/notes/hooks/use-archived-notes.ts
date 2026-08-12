import { useQuery } from "@tanstack/react-query";

import { getArchivedNotes } from "../api/notes.api";
import { notesQueryKeys } from "./use-notes";

export function useArchivedNotes() {
  return useQuery({
    queryKey: notesQueryKeys.archived(),
    queryFn: getArchivedNotes,
    staleTime: 30_000,
  });
}
