import { useQuery } from "@tanstack/react-query";

import {
  searchNotes,
  type SearchNotesInput,
} from "../api/search.api";

export const searchQueryKeys = {
  all: ["search"] as const,

  notes: (input: SearchNotesInput) =>
    [...searchQueryKeys.all, "notes", input] as const,
};

export function useSearchNotes(input: SearchNotesInput) {
  const normalizedQuery = input.query.trim();

  return useQuery({
    queryKey: searchQueryKeys.notes({
      ...input,
      query: normalizedQuery,
    }),
    queryFn: () =>
      searchNotes({
        ...input,
        query: normalizedQuery,
      }),
    enabled: normalizedQuery.length > 0,
    staleTime: 30_000,
  });
}
