import type { SearchOptions } from "../types/editor-search.types";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildSearchExpression(
  query: string,
  options: SearchOptions,
): RegExp | null {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return null;
  }

  const pattern = options.wholeWord
    ? `\\b${escapeRegExp(normalizedQuery)}\\b`
    : escapeRegExp(normalizedQuery);

  return new RegExp(pattern, options.matchCase ? "g" : "gi");
}
