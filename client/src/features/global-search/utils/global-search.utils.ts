import type { Note } from "@/features/notes/types/note.types";

import type {
  GlobalSearchMatchField,
  GlobalSearchResult,
} from "../types/global-search.types";

const DEFAULT_RESULT_LIMIT = 8;

type SearchCandidate = {
  field: GlobalSearchMatchField;
  value: string;
  baseScore: number;
};

function normalizeSearchValue(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function getCandidateScore(
  candidate: SearchCandidate,
  normalizedQuery: string,
): number {
  const normalizedValue = normalizeSearchValue(candidate.value);

  if (normalizedValue === normalizedQuery) {
    return candidate.baseScore + 40;
  }

  if (normalizedValue.startsWith(normalizedQuery)) {
    return candidate.baseScore + 25;
  }

  if (normalizedValue.includes(normalizedQuery)) {
    return candidate.baseScore + 10;
  }

  return 0;
}

function getNoteSearchCandidates(note: Note): SearchCandidate[] {
  return [
    {
      field: "title",
      value: note.title,
      baseScore: 100,
    },
    {
      field: "preview",
      value: note.preview,
      baseScore: 45,
    },
    {
      field: "folder",
      value: note.folderName,
      baseScore: 60,
    },
    ...note.tags.map<SearchCandidate>((tag) => ({
      field: "tag",
      value: tag,
      baseScore: 70,
    })),
  ];
}

function createSearchResult(
  note: Note,
  normalizedQuery: string,
): GlobalSearchResult | null {
  const candidateMatches = getNoteSearchCandidates(note)
    .map((candidate) => ({
      field: candidate.field,
      score: getCandidateScore(candidate, normalizedQuery),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((first, second) => second.score - first.score);

  const bestMatch = candidateMatches[0];

  if (!bestMatch) {
    return null;
  }

  return {
    note,
    matchedField: bestMatch.field,
    score: bestMatch.score,
  };
}

export function searchNotesGlobally(
  notes: Note[],
  query: string,
  limit = DEFAULT_RESULT_LIMIT,
): GlobalSearchResult[] {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return [];
  }

  return notes
    .filter((note) => !note.deletedAt && !note.isArchived)
    .map((note) => createSearchResult(note, normalizedQuery))
    .filter((result): result is GlobalSearchResult => result !== null)
    .sort((first, second) => {
      if (first.score !== second.score) {
        return second.score - first.score;
      }

      return (
        new Date(second.note.updatedAt).getTime() -
        new Date(first.note.updatedAt).getTime()
      );
    })
    .slice(0, limit);
}
