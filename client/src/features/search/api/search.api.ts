import type { GlobalSearchResult } from "@/features/global-search/types/global-search.types";
import { apiClient } from "@/services/api/api-client";
import { API_ENDPOINTS } from "@/services/api/api-endpoints";

import type { SearchPageSortOption } from "../types/search.types";

export type SearchNotesInput = {
  query: string;
  folder?: string;
  tag?: string;
  sort: SearchPageSortOption;
  favoritesOnly?: boolean;
  pinnedOnly?: boolean;
  limit?: number;
};

type SearchNotesResponse = {
  results: GlobalSearchResult[];
};

export async function searchNotes(
  input: SearchNotesInput,
): Promise<GlobalSearchResult[]> {
  const response = await apiClient.get<SearchNotesResponse>(
    API_ENDPOINTS.notes.search,
    {
      params: {
        q: input.query,
        ...(input.folder ? { folder: input.folder } : {}),
        ...(input.tag ? { tag: input.tag } : {}),
        sort: input.sort,
        ...(input.favoritesOnly
          ? { favoritesOnly: true }
          : {}),
        ...(input.pinnedOnly
          ? { pinnedOnly: true }
          : {}),
        ...(input.limit ? { limit: input.limit } : {}),
      },
    },
  );

  return response.data.results;
}
