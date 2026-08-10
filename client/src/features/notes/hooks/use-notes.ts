import { useQuery } from "@tanstack/react-query";

import { getNotes } from "../api/notes.api";

const notesQueryKeys = {
  all: ["notes"] as const,
  list: () => [...notesQueryKeys.all, "list"] as const,
};

export function useNotes() {
  return useQuery({
    queryKey: notesQueryKeys.list(),
    queryFn: getNotes,
    staleTime: 30_000,
  });
}
