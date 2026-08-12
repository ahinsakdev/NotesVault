import { useQuery } from "@tanstack/react-query";

import { getTrashNotes } from "@/features/notes/api/notes.api";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";

export function useTrashNotes() {
  return useQuery({
    queryKey: notesQueryKeys.trash(),
    queryFn: getTrashNotes,
    staleTime: 30_000,
  });
}
