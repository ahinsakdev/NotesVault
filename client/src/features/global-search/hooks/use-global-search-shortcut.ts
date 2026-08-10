import { useEffect } from "react";
import { useLocation } from "react-router";

type UseGlobalSearchShortcutOptions = {
  onOpen: () => void;
};

function isEditableTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

function isNoteEditorRoute(pathname: string): boolean {
  return /^\/app\/notes\/[^/]+$/.test(pathname) && !pathname.endsWith("/read");
}

export function useGlobalSearchShortcut({
  onOpen,
}: UseGlobalSearchShortcutOptions) {
  const { pathname } = useLocation();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isSearchShortcut =
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLocaleLowerCase() === "k";

      if (!isSearchShortcut) {
        return;
      }

      if (isNoteEditorRoute(pathname)) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      event.preventDefault();
      onOpen();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpen, pathname]);
}
