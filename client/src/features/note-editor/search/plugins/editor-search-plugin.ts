import { Plugin, PluginKey } from "@tiptap/pm/state";
import { DecorationSet } from "@tiptap/pm/view";

import type { SearchMatch, SearchOptions } from "../types/editor-search.types";
import {
  createSearchDecorations,
  findSearchMatches,
} from "../utils/create-search-decorations";

export const editorSearchPluginKey = new PluginKey<EditorSearchPluginState>(
  "editor-search",
);

export type EditorSearchPluginMeta = {
  activeMatchIndex: number;
  options: SearchOptions;
  query: string;
};

export type EditorSearchPluginState = {
  activeMatchIndex: number;
  decorations: DecorationSet;
  matches: SearchMatch[];
  options: SearchOptions;
  query: string;
};

const defaultOptions: SearchOptions = {
  matchCase: false,
  wholeWord: false,
};

export const editorSearchPlugin = new Plugin<EditorSearchPluginState>({
  key: editorSearchPluginKey,

  state: {
    init() {
      return {
        activeMatchIndex: -1,
        decorations: DecorationSet.empty,
        matches: [],
        options: defaultOptions,
        query: "",
      };
    },

    apply(transaction, previousState) {
      const meta = transaction.getMeta(editorSearchPluginKey) as
        | EditorSearchPluginMeta
        | undefined;

      if (!meta && !transaction.docChanged) {
        return {
          ...previousState,
          decorations: previousState.decorations.map(
            transaction.mapping,
            transaction.doc,
          ),
        };
      }

      const query = meta?.query ?? previousState.query;
      const options = meta?.options ?? previousState.options;

      const matches = findSearchMatches(transaction.doc, query, options);

      const requestedIndex =
        meta?.activeMatchIndex ?? previousState.activeMatchIndex;

      const activeMatchIndex =
        matches.length === 0
          ? -1
          : Math.min(Math.max(requestedIndex, 0), matches.length - 1);

      return {
        activeMatchIndex,
        decorations: createSearchDecorations({
          activeMatchIndex,
          doc: transaction.doc,
          matches,
        }),
        matches,
        options,
        query,
      };
    },
  },

  props: {
    decorations(state) {
      return editorSearchPluginKey.getState(state)?.decorations;
    },
  },
});
