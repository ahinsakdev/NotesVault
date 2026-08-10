import type { Editor } from "@tiptap/react";

export type SearchDirection = "next" | "previous";

export type SearchOptions = {
  matchCase: boolean;
  wholeWord: boolean;
};

export type SearchMatch = {
  from: number;
  to: number;
};

export type EditorSearchState = {
  query: string;
  replace: string;
  options: SearchOptions;
  matches: SearchMatch[];
  activeMatchIndex: number;
};

export type UseEditorSearchProps = {
  editor: Editor | null;
};
