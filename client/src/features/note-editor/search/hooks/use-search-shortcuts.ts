import { useEffect } from "react";

type UseSearchShortcutsProps = {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onOpenFind: () => void;
  onOpenReplace: () => void;
  onPrevious: () => void;
};

function isSearchInput(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    target.closest("[data-editor-search-panel]") !== null
  );
}

export function useSearchShortcuts({
  isOpen,
  onClose,
  onNext,
  onOpenFind,
  onOpenReplace,
  onPrevious,
}: UseSearchShortcutsProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      const hasPrimaryModifier = event.metaKey || event.ctrlKey;

      if (hasPrimaryModifier && !event.altKey && key === "f") {
        event.preventDefault();
        onOpenFind();
        return;
      }

      if (hasPrimaryModifier && !event.altKey && key === "h") {
        event.preventDefault();
        onOpenReplace();
        return;
      }

      if (!isOpen) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Enter" && isSearchInput(event.target)) {
        event.preventDefault();

        if (event.shiftKey) {
          onPrevious();
          return;
        }

        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onOpenFind, onOpenReplace, onPrevious]);
}
