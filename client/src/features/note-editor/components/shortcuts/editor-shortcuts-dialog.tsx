import { Keyboard, Search, X } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useDialogFocus } from "@/hooks/use-dialog-focus";

import {
  editorShortcutGroups,
  editorShortcuts,
} from "../../shortcuts/editor-shortcuts";
import type { EditorShortcut } from "../../types/editor-shortcut.types";

type EditorShortcutsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

function isMacPlatform(): boolean {
  return (
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/i.test(navigator.platform)
  );
}

function matchesQuery(
  shortcut: EditorShortcut,
  normalizedQuery: string,
): boolean {
  if (!normalizedQuery) {
    return true;
  }

  const searchableValue = [
    shortcut.label,
    shortcut.description,
    ...shortcut.keywords,
  ]
    .join(" ")
    .toLowerCase();

  return searchableValue.includes(normalizedQuery);
}

export function EditorShortcutsDialog({
  isOpen,
  onClose,
}: EditorShortcutsDialogProps) {
  const [query, setQuery] = useState("");

  const dialogRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const isMac = useMemo(() => isMacPlatform(), []);

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  const filteredShortcuts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return editorShortcuts.filter((shortcut) =>
      matchesQuery(shortcut, normalizedQuery),
    );
  }, [query]);

  useDialogFocus({
    containerRef: dialogRef,
    initialFocusRef: searchInputRef,
    isOpen,
    onEscape: handleClose,
  });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      aria-label="Keyboard shortcuts"
      aria-modal="true"
      className="notesvault-shortcuts-dialog"
      role="dialog"
    >
      <button
        aria-label="Close keyboard shortcuts"
        className="notesvault-shortcuts-backdrop"
        onClick={handleClose}
        type="button"
      />

      <section
        className="notesvault-shortcuts-panel"
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className="flex min-h-14 items-center gap-3 border-b border-border bg-surface-subtle px-4 py-3">
          <div className="flex size-8 shrink-0 items-center justify-center border border-border bg-background text-primary">
            <Keyboard aria-hidden="true" className="size-3.5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-foreground">
              Keyboard shortcuts
            </h2>

            <p className="mt-0.5 text-[9px] text-muted-foreground">
              Work faster without leaving the keyboard
            </p>
          </div>

          <button
            aria-label="Close keyboard shortcuts"
            className="notesvault-focus-ring ml-auto flex size-8 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={handleClose}
            type="button"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </header>

        <div className="border-b border-border p-3">
          <label className="relative block">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
            />

            <span className="sr-only">Search keyboard shortcuts</span>

            <input
              className="h-9 w-full border border-input bg-background pl-9 pr-3 text-xs text-foreground outline-none transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search shortcuts..."
              ref={searchInputRef}
              type="search"
              value={query}
            />
          </label>
        </div>

        <div className="notesvault-shortcuts-scrollbar max-h-[min(65vh,34rem)] overflow-y-auto p-3">
          {filteredShortcuts.length > 0 ? (
            <div className="space-y-5">
              {editorShortcutGroups.map((group) => {
                const groupShortcuts = filteredShortcuts.filter(
                  (shortcut) => shortcut.groupId === group.id,
                );

                if (groupShortcuts.length === 0) {
                  return null;
                }

                return (
                  <section key={group.id}>
                    <h3 className="mb-2 px-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      {group.label}
                    </h3>

                    <div className="overflow-hidden border border-border">
                      {groupShortcuts.map((shortcut, index) => {
                        const keys = isMac
                          ? shortcut.macKeys
                          : shortcut.windowsKeys;

                        return (
                          <div
                            className={
                              index > 0
                                ? "flex items-center gap-4 border-t border-border bg-background px-3 py-2.5"
                                : "flex items-center gap-4 bg-background px-3 py-2.5"
                            }
                            key={shortcut.id}
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-medium text-foreground">
                                {shortcut.label}
                              </p>

                              <p className="mt-0.5 text-[9px] leading-4 text-muted-foreground">
                                {shortcut.description}
                              </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-1">
                              {keys.map((key, keyIndex) => (
                                <kbd
                                  className="inline-flex min-w-6 items-center justify-center border border-border-strong bg-surface-subtle px-1.5 py-1 font-sans text-[9px] font-medium text-foreground shadow-[0_1px_0_var(--border-strong)]"
                                  key={`${shortcut.id}-${key}-${keyIndex}`}
                                >
                                  {key}
                                </kbd>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-14 text-center">
              <Keyboard
                aria-hidden="true"
                className="mx-auto size-5 text-muted-foreground"
              />

              <p className="mt-3 text-xs font-medium text-foreground">
                No shortcuts found
              </p>

              <p className="mt-1 text-[10px] text-muted-foreground">
                Try a different formatting or command name.
              </p>
            </div>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-border bg-surface-subtle px-4 py-2.5 text-[9px] text-muted-foreground">
          <span>{filteredShortcuts.length} shortcuts</span>

          <span className="hidden sm:inline">Press Esc to close</span>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
