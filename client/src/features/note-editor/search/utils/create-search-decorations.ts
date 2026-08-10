import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

import type { SearchMatch, SearchOptions } from "../types/editor-search.types";
import { buildSearchExpression } from "./search.utils";

type CreateSearchDecorationsOptions = {
  doc: ProseMirrorNode;
  matches: SearchMatch[];
  activeMatchIndex: number;
};

export function findSearchMatches(
  doc: ProseMirrorNode,
  query: string,
  options: SearchOptions,
): SearchMatch[] {
  const expression = buildSearchExpression(query, options);

  if (!expression) {
    return [];
  }

  const matches: SearchMatch[] = [];

  doc.descendants((node, position) => {
    if (!node.isText || !node.text) {
      return;
    }

    expression.lastIndex = 0;

    let result: RegExpExecArray | null;

    while ((result = expression.exec(node.text)) !== null) {
      if (result[0].length === 0) {
        expression.lastIndex += 1;
        continue;
      }

      const from = position + result.index;
      const to = from + result[0].length;

      matches.push({ from, to });
    }
  });

  return matches;
}

export function createSearchDecorations({
  doc,
  matches,
  activeMatchIndex,
}: CreateSearchDecorationsOptions): DecorationSet {
  const decorations = matches.map((match, index) =>
    Decoration.inline(match.from, match.to, {
      class:
        index === activeMatchIndex
          ? "notesvault-search-match-active"
          : "notesvault-search-match",
    }),
  );

  return DecorationSet.create(doc, decorations);
}
