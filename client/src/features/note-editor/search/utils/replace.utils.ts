import { buildSearchExpression } from "./search.utils";

import type { SearchOptions } from "../types/editor-search.types";

export function replaceAllOccurrences(
  text: string,
  query: string,
  replacement: string,
  options: SearchOptions,
): string {
  const expression = buildSearchExpression(query, options);

  if (!expression) {
    return text;
  }

  return text.replace(expression, replacement);
}
