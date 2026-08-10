import type { Editor } from "@tiptap/react";

import {
  editorSearchPluginKey,
  type EditorSearchPluginMeta,
} from "../plugins/editor-search-plugin";
import type { SearchMatch, SearchOptions } from "../types/editor-search.types";

type SetSearchQueryOptions = {
  activeMatchIndex: number;
  editor: Editor;
  options: SearchOptions;
  query: string;
};

function dispatchSearchMeta(
  editor: Editor,
  meta: EditorSearchPluginMeta,
): void {
  const transaction = editor.state.tr.setMeta(editorSearchPluginKey, meta);

  editor.view.dispatch(transaction);
}

export function getSearchMatches(editor: Editor): SearchMatch[] {
  return editorSearchPluginKey.getState(editor.state)?.matches ?? [];
}

export function setSearchQuery({
  activeMatchIndex,
  editor,
  options,
  query,
}: SetSearchQueryOptions): SearchMatch[] {
  dispatchSearchMeta(editor, {
    activeMatchIndex,
    options,
    query,
  });

  return getSearchMatches(editor);
}

export function clearSearch(editor: Editor): void {
  dispatchSearchMeta(editor, {
    activeMatchIndex: -1,
    options: {
      matchCase: false,
      wholeWord: false,
    },
    query: "",
  });
}

export function selectSearchMatch(editor: Editor, match: SearchMatch): void {
  editor
    .chain()
    .focus()
    .setTextSelection({
      from: match.from,
      to: match.to,
    })
    .scrollIntoView()
    .run();
}
