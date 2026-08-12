import { useQuery } from "@tanstack/react-query";

import { getNoteById } from "../api/notes.api";
import { notesQueryKeys } from "./use-notes";

export function useNote(noteId: string | null) {
  return useQuery({
    queryKey: notesQueryKeys.detail(noteId ?? "new"),
    queryFn: () => getNoteById(noteId ?? ""),
    enabled: Boolean(noteId),
    staleTime: 30_000,
  });
}
