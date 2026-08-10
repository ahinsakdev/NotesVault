import { ChevronDown, ChevronUp, Replace, ReplaceAll, X } from "lucide-react";

type EditorSearchActionsProps = {
  hasMatches: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReplace: () => void;
  onReplaceAll: () => void;
};

export function EditorSearchActions({
  hasMatches,
  onClose,
  onNext,
  onPrevious,
  onReplace,
  onReplaceAll,
}: EditorSearchActionsProps) {
  return (
    <div className="notesvault-search-actions">
      <button
        aria-label="Previous match"
        className="notesvault-focus-ring notesvault-search-action"
        disabled={!hasMatches}
        onClick={onPrevious}
        title="Previous match (Shift + Enter)"
        type="button"
      >
        <ChevronUp aria-hidden="true" className="size-3.5" />
      </button>

      <button
        aria-label="Next match"
        className="notesvault-focus-ring notesvault-search-action"
        disabled={!hasMatches}
        onClick={onNext}
        title="Next match (Enter)"
        type="button"
      >
        <ChevronDown aria-hidden="true" className="size-3.5" />
      </button>

      <button
        aria-label="Replace current match"
        className="notesvault-focus-ring notesvault-search-action"
        disabled={!hasMatches}
        onClick={onReplace}
        title="Replace current match"
        type="button"
      >
        <Replace aria-hidden="true" className="size-3.5" />
      </button>

      <button
        aria-label="Replace all matches"
        className="notesvault-focus-ring notesvault-search-action"
        disabled={!hasMatches}
        onClick={onReplaceAll}
        title="Replace all matches"
        type="button"
      >
        <ReplaceAll aria-hidden="true" className="size-3.5" />
      </button>

      <button
        aria-label="Close search"
        className="notesvault-focus-ring notesvault-search-action"
        onClick={onClose}
        title="Close search"
        type="button"
      >
        <X aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  );
}
