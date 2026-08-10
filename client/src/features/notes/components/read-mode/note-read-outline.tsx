import { BookOpen, ListTree, X } from "lucide-react";
import { useEffect } from "react";

import { cn } from "@/utils/cn";

import type { NoteOutlineItem } from "../../types/note-outline.types";

type NoteReadOutlineProps = {
  activeHeadingId: string | null;
  isOpen: boolean;
  items: NoteOutlineItem[];
  onClose: () => void;
  onSelect: (item: NoteOutlineItem) => void;
};

export function NoteReadOutline({
  activeHeadingId,
  isOpen,
  items,
  onClose,
  onSelect,
}: NoteReadOutlineProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close document outline"
        className="fixed inset-0 z-40 cursor-default bg-background/35 backdrop-blur-[1px] md:bg-transparent md:backdrop-blur-none"
        onClick={onClose}
        type="button"
      />

      <aside
        aria-label="Document outline"
        className="fixed inset-x-3 bottom-3 z-50 max-h-[70vh] overflow-hidden border border-border bg-popover text-popover-foreground shadow-dialog md:inset-x-auto md:bottom-auto md:right-6 md:top-24 md:w-72"
      >
        <header className="flex h-12 items-center gap-2 border-b border-border bg-surface-subtle px-3">
          <ListTree
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />

          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-foreground">
              Document outline
            </h2>

            <p className="text-[9px] text-muted-foreground">
              {items.length} {items.length === 1 ? "section" : "sections"}
            </p>
          </div>

          <button
            aria-label="Close document outline"
            className="notesvault-focus-ring ml-auto flex size-8 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </header>

        <nav
          aria-label="Note sections"
          className="notesvault-outline-scrollbar max-h-[calc(70vh-3rem)] overflow-y-auto p-2"
        >
          {items.length > 0 ? (
            <ul className="space-y-0.5">
              {items.map((item) => {
                const isActive = item.id === activeHeadingId;

                return (
                  <li key={item.id}>
                    <button
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "notesvault-focus-ring flex min-h-8 w-full items-center border-l-2 px-2 py-1.5 text-left text-[11px] leading-4 transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
                        item.level === 2 && "pl-5",
                        item.level === 3 && "pl-8",
                        isActive
                          ? "border-primary bg-secondary text-foreground"
                          : "border-transparent text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                      )}
                      onClick={() => onSelect(item)}
                      type="button"
                    >
                      <span className="line-clamp-2">{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-10 text-center">
              <BookOpen
                aria-hidden="true"
                className="mx-auto size-5 text-muted-foreground"
              />

              <p className="mt-3 text-xs font-medium text-foreground">
                No headings found
              </p>

              <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                Add headings in Edit mode to generate document navigation.
              </p>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
