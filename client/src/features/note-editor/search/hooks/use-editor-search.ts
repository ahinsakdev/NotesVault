import { useCallback, useState } from "react";

import {
  clearSearch,
  getSearchMatches,
  selectSearchMatch,
  setSearchQuery,
} from "../commands/search-commands";
import type {
  SearchMatch,
  SearchOptions,
  UseEditorSearchProps,
} from "../types/editor-search.types";

const defaultOptions: SearchOptions = {
  matchCase: false,
  wholeWord: false,
};

export function useEditorSearch({ editor }: UseEditorSearchProps) {
  const [query, setQueryState] = useState("");
  const [replace, setReplace] = useState("");
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [activeMatchIndex, setActiveMatchIndexState] = useState(-1);
  const [options, setOptions] = useState<SearchOptions>(defaultOptions);

  const runSearch = useCallback(
    (nextQuery: string, nextOptions: SearchOptions, requestedIndex: number) => {
      setQueryState(nextQuery);

      if (!editor || editor.isDestroyed) {
        setMatches([]);
        setActiveMatchIndexState(-1);
        return;
      }

      const nextMatches = setSearchQuery({
        activeMatchIndex: requestedIndex,
        editor,
        options: nextOptions,
        query: nextQuery,
      });

      const nextIndex =
        nextMatches.length === 0
          ? -1
          : Math.min(Math.max(requestedIndex, 0), nextMatches.length - 1);

      setMatches(nextMatches);
      setActiveMatchIndexState(nextIndex);

      const match = nextMatches[nextIndex];

      if (match) {
        selectSearchMatch(editor, match);
      }
    },
    [editor],
  );

  const setActiveMatchIndex = useCallback(
    (requestedIndex: number) => {
      if (matches.length === 0) {
        return;
      }

      const nextIndex =
        ((requestedIndex % matches.length) + matches.length) % matches.length;

      runSearch(query, options, nextIndex);
    },
    [matches.length, options, query, runSearch],
  );

  const next = useCallback(() => {
    setActiveMatchIndex(activeMatchIndex + 1);
  }, [activeMatchIndex, setActiveMatchIndex]);

  const previous = useCallback(() => {
    setActiveMatchIndex(activeMatchIndex - 1);
  }, [activeMatchIndex, setActiveMatchIndex]);

  const replaceOne = useCallback(() => {
    if (!editor || editor.isDestroyed || activeMatchIndex < 0) {
      return;
    }

    const match = matches[activeMatchIndex];

    if (!match) {
      return;
    }

    editor.view.dispatch(
      editor.state.tr.insertText(replace, match.from, match.to),
    );

    const refreshedMatches = getSearchMatches(editor);

    setMatches(refreshedMatches);

    const nextIndex =
      refreshedMatches.length === 0
        ? -1
        : Math.min(activeMatchIndex, refreshedMatches.length - 1);

    runSearch(query, options, nextIndex);
  }, [activeMatchIndex, editor, matches, options, query, replace, runSearch]);

  const replaceAll = useCallback(() => {
    if (!editor || editor.isDestroyed || matches.length === 0) {
      return;
    }

    let transaction = editor.state.tr;

    [...matches].reverse().forEach((match) => {
      transaction = transaction.insertText(replace, match.from, match.to);
    });

    editor.view.dispatch(transaction);
    runSearch(query, options, 0);
  }, [editor, matches, options, query, replace, runSearch]);

  const closeSearch = useCallback(() => {
    setQueryState("");
    setReplace("");
    setMatches([]);
    setActiveMatchIndexState(-1);
    setOptions(defaultOptions);

    if (editor && !editor.isDestroyed) {
      clearSearch(editor);
    }
  }, [editor]);

  return {
    activeMatchIndex,
    closeSearch,
    matches,
    next,
    options,
    previous,
    query,
    replace,
    replaceAll,
    replaceOne,

    setActiveMatchIndex,

    setQuery(value: string) {
      runSearch(value, options, 0);
    },

    setReplace,

    toggleMatchCase() {
      const nextOptions = {
        ...options,
        matchCase: !options.matchCase,
      };

      setOptions(nextOptions);
      runSearch(query, nextOptions, 0);
    },

    toggleWholeWord() {
      const nextOptions = {
        ...options,
        wholeWord: !options.wholeWord,
      };

      setOptions(nextOptions);
      runSearch(query, nextOptions, 0);
    },
  };
}
