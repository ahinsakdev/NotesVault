import { useQuery } from "@tanstack/react-query";

import { getNotes } from "../api/notes.api";

export const notesQueryKeys = {
  all: ["notes"] as const,
  list: () => [...notesQueryKeys.all, "list"] as const,
  archived: () => [...notesQueryKeys.all, "archived"] as const,
  trash: () => [...notesQueryKeys.all, "trash"] as const,
  detail: (noteId: string) =>
    [...notesQueryKeys.all, "detail", noteId] as const,
};

export function useNotes() {
  return useQuery({
    queryKey: notesQueryKeys.list(),
    queryFn: getNotes,
    staleTime: 30_000,
  });
}
