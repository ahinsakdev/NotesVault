import { WholeWord } from "lucide-react";

import { cn } from "@/utils/cn";

type EditorSearchOptionsProps = {
  matchCase: boolean;
  onToggleMatchCase: () => void;
  onToggleWholeWord: () => void;
  wholeWord: boolean;
};

export function EditorSearchOptions({
  matchCase,
  onToggleMatchCase,
  onToggleWholeWord,
  wholeWord,
}: EditorSearchOptionsProps) {
  return (
    <div
      aria-label="Search options"
      className="notesvault-search-options"
      role="group"
    >
      <button
        aria-label="Match case"
        aria-pressed={matchCase}
        className={cn(
          "notesvault-focus-ring notesvault-search-option",
          matchCase && "is-active",
        )}
        onClick={onToggleMatchCase}
        title="Match case"
        type="button"
      >
        Aa
      </button>

      <button
        aria-label="Match whole word"
        aria-pressed={wholeWord}
        className={cn(
          "notesvault-focus-ring notesvault-search-option",
          wholeWord && "is-active",
        )}
        onClick={onToggleWholeWord}
        title="Match whole word"
        type="button"
      >
        <WholeWord aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  );
}
