import { useCallback, useEffect, useState } from "react";

type UseEditorCommandPaletteOptions = {
  isSearchOpen: boolean;
  onCloseSearch: () => void;
};

function isFormInput(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

export function useEditorCommandPalette({
  isSearchOpen,
  onCloseSearch,
}: UseEditorCommandPaletteOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const openPalette = useCallback(() => {
    if (isSearchOpen) {
      onCloseSearch();
    }

    setIsOpen(true);
  }, [isSearchOpen, onCloseSearch]);

  const closePalette = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isShortcut =
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        event.key.toLowerCase() === "k";

      if (!isShortcut || isFormInput(event.target)) {
        return;
      }

      event.preventDefault();

      setIsOpen((currentValue) => {
        if (!currentValue && isSearchOpen) {
          onCloseSearch();
        }

        return !currentValue;
      });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, onCloseSearch]);

  return {
    closePalette,
    isOpen,
    openPalette,
  };
}
