import type { Editor } from "@tiptap/react";
import { Command, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useDialogFocus } from "@/hooks/use-dialog-focus";

import { getAvailableEditorCommands } from "../registry/editor-command-registry";
import type {
  EditorCommandGroup,
  EditorCommandItem,
} from "../types/editor-command.types";
import { EditorCommandGroup as EditorCommandGroupSection } from "./editor-command-group";

const commandGroups: readonly EditorCommandGroup[] = [
  "formatting",
  "blocks",
  "insert",
  "history",
  "help",
];

type EditorCommandPaletteProps = {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
  onOpenShortcuts: () => void;
};

function commandMatchesQuery(
  command: EditorCommandItem,
  query: string,
): boolean {
  if (!query) {
    return true;
  }

  const searchableValue = [
    command.title,
    command.description,
    command.group,
    ...command.keywords,
  ]
    .join(" ")
    .toLowerCase();

  return searchableValue.includes(query);
}

export function EditorCommandPalette({
  editor,
  isOpen,
  onClose,
  onOpenShortcuts,
}: EditorCommandPaletteProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = useMemo(() => getAvailableEditorCommands(), []);

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return commands.filter((command) =>
      commandMatchesQuery(command, normalizedQuery),
    );
  }, [commands, query]);

  const availableCommands = useMemo(
    () =>
      filteredCommands.filter(
        (command) => command.isAvailable?.(editor) ?? true,
      ),
    [editor, filteredCommands],
  );

  const selectedCommand = availableCommands[selectedIndex] ?? null;

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const executeCommand = useCallback(
    (command: EditorCommandItem) => {
      const isAvailable = command.isAvailable?.(editor) ?? true;

      if (!isAvailable) {
        return;
      }

      handleClose();

      command.execute({
        editor,
        openShortcuts: onOpenShortcuts,
      });
    },
    [editor, handleClose, onOpenShortcuts],
  );

  useDialogFocus({
    containerRef: dialogRef,
    initialFocusRef: inputRef,
    isOpen,
    onEscape: handleClose,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowDown") {
        event.preventDefault();

        setSelectedIndex((currentIndex) => {
          if (availableCommands.length === 0) {
            return 0;
          }

          return (currentIndex + 1) % availableCommands.length;
        });

        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setSelectedIndex((currentIndex) => {
          if (availableCommands.length === 0) {
            return 0;
          }

          return (
            (currentIndex - 1 + availableCommands.length) %
            availableCommands.length
          );
        });

        return;
      }

      if (event.key === "Enter" && selectedCommand) {
        event.preventDefault();
        executeCommand(selectedCommand);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [availableCommands.length, executeCommand, isOpen, selectedCommand]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      aria-label="Editor command palette"
      aria-modal="true"
      className="notesvault-command-dialog"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <button
        aria-label="Close command palette"
        className="notesvault-command-backdrop"
        onClick={handleClose}
        type="button"
      />

      <section className="notesvault-command-panel">
        <header className="notesvault-command-header">
          <Command
            aria-hidden="true"
            className="size-4 shrink-0 text-primary"
          />

          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-foreground">
              Command palette
            </h2>

            <p className="mt-0.5 text-[9px] text-muted-foreground">
              Search and run editor actions
            </p>
          </div>

          <button
            aria-label="Close command palette"
            className="notesvault-command-close"
            onClick={handleClose}
            type="button"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </header>

        <label className="notesvault-command-search">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
          />

          <span className="sr-only">Search editor commands</span>

          <input
            autoComplete="off"
            className="notesvault-command-search-input"
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search commands..."
            ref={inputRef}
            spellCheck={false}
            type="search"
            value={query}
          />
        </label>

        <div
          aria-label="Available editor commands"
          className="notesvault-command-results"
          role="listbox"
        >
          {filteredCommands.length > 0 ? (
            <div className="space-y-4">
              {commandGroups.map((group) => (
                <EditorCommandGroupSection
                  commands={filteredCommands.filter(
                    (command) => command.group === group,
                  )}
                  editor={editor}
                  group={group}
                  key={group}
                  onSelect={executeCommand}
                  selectedCommandId={selectedCommand?.id ?? null}
                />
              ))}
            </div>
          ) : (
            <div className="px-5 py-14 text-center">
              <Command
                aria-hidden="true"
                className="mx-auto size-5 text-muted-foreground"
              />

              <p className="mt-3 text-xs font-medium text-foreground">
                No commands found
              </p>

              <p className="mt-1 text-[10px] text-muted-foreground">
                Try a formatting, block, or insert action.
              </p>
            </div>
          )}
        </div>

        <footer className="notesvault-command-footer">
          <span>{filteredCommands.length} commands</span>

          <span className="hidden sm:inline">
            ↑↓ Navigate · Enter Run · Esc Close
          </span>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
