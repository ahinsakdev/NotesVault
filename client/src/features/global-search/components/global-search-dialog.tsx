import { AlertCircle, LoaderCircle, Search, X } from "lucide-react";
import { useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

import { useGlobalSearch } from "../hooks/use-global-search";
import { useGlobalSearchShortcut } from "../hooks/use-global-search-shortcut";
import { GlobalSearchResultItem } from "./global-search-result-item";

type GlobalSearchDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export function GlobalSearchDialog({
  isOpen,
  onClose,
  onOpen,
}: GlobalSearchDialogProps) {
  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const {
    query,
    refetch,
    results,
    selectedIndex,
    selectNextResult,
    selectPreviousResult,
    setSelectedIndex,
    status,
    updateQuery,
  } = useGlobalSearch();

  useGlobalSearchShortcut({
    onOpen,
  });

  useDialogFocus({
    containerRef: dialogRef,
    initialFocusRef: searchInputRef,
    isOpen,
    onEscape: onClose,
  });

  if (!isOpen) {
    return null;
  }

  function openSelectedResult() {
    const selectedResult = results[selectedIndex];

    if (!selectedResult) {
      return;
    }

    navigate(ROUTES.noteRead.replace(":noteId", selectedResult.note.id));
    onClose();
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      selectNextResult();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      selectPreviousResult();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      openSelectedResult();
    }
  }

  return createPortal(
    <div
      aria-label="Global search"
      aria-modal="true"
      className="notesvault-overlay-backdrop fixed inset-0 z-[100] flex items-start justify-center bg-foreground/15 px-3 pt-[8vh] backdrop-blur-[2px] sm:px-5 sm:pt-[12vh] dark:bg-black/45"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      }}
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <section className="notesvault-overlay-panel flex max-h-[min(38rem,78vh)] w-full max-w-2xl flex-col overflow-hidden border border-border bg-popover shadow-dialog">
        <header className="border-b border-border p-3">
          <div className="flex h-12 w-full items-center border border-input bg-background">
            <div className="flex h-full w-11 shrink-0 items-center justify-center text-muted-foreground">
              <Search aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </div>

            <input
              aria-label="Search all notes"
              autoComplete="off"
              className="global-search-input h-full min-w-0 flex-1 bg-transparent px-0 text-sm text-foreground placeholder:text-muted-foreground"
              onChange={(event) => updateQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search titles, content, folders and tags..."
              ref={searchInputRef}
              type="text"
              value={query}
            />

            {query ? (
              <button
                aria-label="Clear search"
                className="notesvault-focus-ring flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
                onClick={() => {
                  updateQuery("");
                  searchInputRef.current?.focus();
                }}
                title="Clear search"
                type="button"
              >
                <X aria-hidden="true" className="size-3.5" />
              </button>
            ) : null}

            <div className="flex h-full shrink-0 items-center px-3">
              <kbd className="border border-border bg-surface-subtle px-1.5 py-1 text-[9px] leading-none text-muted-foreground">
                ESC
              </kbd>
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {status === "idle" ? (
            <div className="flex min-h-52 flex-col items-center justify-center px-6 py-10 text-center">
              <div className="flex size-10 items-center justify-center bg-surface-subtle text-muted-foreground">
                <Search
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.8}
                />
              </div>

              <h2 className="mt-4 text-sm font-semibold text-foreground">
                Search your NotesVault
              </h2>

              <p className="mt-1 max-w-sm text-[11px] leading-5 text-muted-foreground">
                Find notes instantly by title, content, folder, or tag.
              </p>
            </div>
          ) : null}

          {status === "loading" ? (
            <div
              aria-label="Searching notes"
              className="flex min-h-52 items-center justify-center"
              role="status"
            >
              <LoaderCircle
                aria-hidden="true"
                className="size-5 animate-spin text-primary"
              />
            </div>
          ) : null}

          {status === "error" ? (
            <div
              className="flex min-h-52 flex-col items-center justify-center px-6 text-center"
              role="alert"
            >
              <AlertCircle aria-hidden="true" className="size-5 text-danger" />

              <h2 className="mt-3 text-sm font-semibold text-foreground">
                Search is unavailable
              </h2>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Notes could not be loaded. Please try again.
              </p>

              <button
                className="notesvault-focus-ring mt-4 h-8 bg-secondary px-3 text-xs font-medium text-secondary-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary-hover"
                onClick={() => {
                  void refetch();
                }}
                type="button"
              >
                Try again
              </button>
            </div>
          ) : null}

          {status === "empty" ? (
            <div
              aria-live="polite"
              className="flex min-h-52 flex-col items-center justify-center px-6 text-center"
              role="status"
            >
              <Search
                aria-hidden="true"
                className="size-5 text-muted-foreground"
              />

              <h2 className="mt-3 text-sm font-semibold text-foreground">
                No notes found
              </h2>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Try another title, folder, tag, or keyword.
              </p>
            </div>
          ) : null}

          {status === "ready" ? (
            <div aria-label="Search results" role="listbox">
              {results.map((result, index) => (
                <GlobalSearchResultItem
                  index={index}
                  isSelected={selectedIndex === index}
                  key={result.note.id}
                  onOpen={() => {
                    navigate(
                      ROUTES.noteRead.replace(":noteId", result.note.id),
                    );

                    onClose();
                  }}
                  onSelect={setSelectedIndex}
                  result={result}
                />
              ))}
            </div>
          ) : null}
        </div>

        <footer className="flex min-h-10 flex-wrap items-center gap-x-4 gap-y-2 border-t border-border bg-surface-subtle px-4 py-2 text-[9px] text-muted-foreground">
          <span>
            <kbd className="border border-border bg-background px-1 py-0.5">
              ↑
            </kbd>{" "}
            <kbd className="border border-border bg-background px-1 py-0.5">
              ↓
            </kbd>{" "}
            Navigate
          </span>

          <span>
            <kbd className="border border-border bg-background px-1 py-0.5">
              Enter
            </kbd>{" "}
            Open
          </span>

          <span
            aria-live="polite"
            aria-atomic="true"
            className="ml-auto"
            role="status"
          >
            {results.length > 0
              ? `${results.length} result${results.length === 1 ? "" : "s"}`
              : "NotesVault search"}
          </span>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
