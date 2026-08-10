import { useEffect } from "react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";

type UseReaderKeyboardShortcutsOptions = {
  noteId: string;
};

export function useReaderKeyboardShortcuts({
  noteId,
}: UseReaderKeyboardShortcutsOptions) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLButtonElement ||
        target instanceof HTMLAnchorElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (event.key.toLowerCase() === "e") {
        event.preventDefault();

        navigate(ROUTES.noteDetails.replace(":noteId", noteId));

        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        navigate(ROUTES.notes);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, noteId]);
}
