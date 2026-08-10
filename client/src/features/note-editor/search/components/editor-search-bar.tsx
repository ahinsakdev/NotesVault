import { useEffect, useRef } from "react";

import { EditorReplaceInput } from "./editor-replace-input";
import { EditorSearchActions } from "./editor-search-actions";
import { EditorSearchInput } from "./editor-search-input";
import { EditorSearchMatchCounter } from "./editor-search-match-counter";
import { EditorSearchOptions } from "./editor-search-options";

type EditorSearchBarProps = {
  currentMatch: number;
  isReplaceVisible: boolean;
  matchCase: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onQueryChange: (value: string) => void;
  onReplace: () => void;
  onReplaceAll: () => void;
  onReplaceChange: (value: string) => void;
  onToggleMatchCase: () => void;
  onToggleWholeWord: () => void;
  query: string;
  replace: string;
  totalMatches: number;
  wholeWord: boolean;
};

export function EditorSearchBar({
  currentMatch,
  isReplaceVisible,
  matchCase,
  onClose,
  onNext,
  onPrevious,
  onQueryChange,
  onReplace,
  onReplaceAll,
  onReplaceChange,
  onToggleMatchCase,
  onToggleWholeWord,
  query,
  replace,
  totalMatches,
  wholeWord,
}: EditorSearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const animationFrameId = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const hasMatches = totalMatches > 0;

  return (
    <section
      aria-label="Search and replace"
      className="notesvault-search-panel"
      data-editor-search-panel
    >
      <div className="notesvault-search-main-row">
        <EditorSearchInput
          inputRef={searchInputRef}
          onChange={onQueryChange}
          value={query}
        />

        <EditorSearchMatchCounter current={currentMatch} total={totalMatches} />

        <EditorSearchOptions
          matchCase={matchCase}
          onToggleMatchCase={onToggleMatchCase}
          onToggleWholeWord={onToggleWholeWord}
          wholeWord={wholeWord}
        />

        <EditorSearchActions
          hasMatches={hasMatches}
          onClose={onClose}
          onNext={onNext}
          onPrevious={onPrevious}
          onReplace={onReplace}
          onReplaceAll={onReplaceAll}
        />
      </div>

      {isReplaceVisible ? (
        <div className="notesvault-search-replace-row">
          <EditorReplaceInput onChange={onReplaceChange} value={replace} />

          <button
            className="notesvault-search-text-action"
            disabled={!hasMatches}
            onClick={onReplace}
            type="button"
          >
            Replace
          </button>

          <button
            className="notesvault-search-text-action"
            disabled={!hasMatches}
            onClick={onReplaceAll}
            type="button"
          >
            Replace all
          </button>
        </div>
      ) : null}
    </section>
  );
}
