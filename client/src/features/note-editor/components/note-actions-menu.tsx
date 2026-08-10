import {
  Copy,
  Download,
  MoreHorizontal,
  Pin,
  Printer,
  Star,
  Trash2,
} from "lucide-react";
import { useRef, useState } from "react";

import { useMenuKeyboardNavigation } from "@/hooks/use-menu-keyboard-navigation";
import { cn } from "@/utils/cn";

type NoteActionsMenuProps = {
  isFavorite: boolean;
  isPinned: boolean;
  onDuplicate: () => void;
  onExport: () => void;
  onFavoriteChange: (value: boolean) => void;
  onPinnedChange: (value: boolean) => void;
  onPrint: () => void;
  onTrash: () => void;
};

export function NoteActionsMenu({
  isFavorite,
  isPinned,
  onDuplicate,
  onExport,
  onFavoriteChange,
  onPinnedChange,
  onPrint,
  onTrash,
}: NoteActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useMenuKeyboardNavigation({
    isOpen,
    menuRef,
    onClose: () => setIsOpen(false),
    triggerRef,
  });

  function runAction(action: () => void) {
    action();
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="More note actions"
        className={cn(
          "flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
          isOpen
            ? "bg-secondary text-foreground"
            : "hover:bg-secondary/70 hover:text-foreground",
        )}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        ref={triggerRef}
        type="button"
      >
        <MoreHorizontal aria-hidden="true" className="size-3.5" />
      </button>

      {isOpen ? (
        <div
          aria-label="Note actions"
          className="notesvault-overlay-popover absolute right-0 top-[calc(100%+0.5rem)] z-50 w-52 border border-border bg-popover p-1 text-popover-foreground shadow-dropdown"
          ref={menuRef}
          role="menu"
        >
          <button
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary"
            onClick={() => runAction(() => onPinnedChange(!isPinned))}
            role="menuitem"
            tabIndex={-1}
            type="button"
          >
            <Pin aria-hidden="true" className="size-3.5" />
            {isPinned ? "Unpin note" : "Pin note"}
          </button>

          <button
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary"
            onClick={() => runAction(() => onFavoriteChange(!isFavorite))}
            role="menuitem"
            tabIndex={-1}
            type="button"
          >
            <Star aria-hidden="true" className="size-3.5" />
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>

          <div aria-hidden="true" className="my-1 border-t border-border" />

          <button
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary"
            onClick={() => runAction(onDuplicate)}
            role="menuitem"
            tabIndex={-1}
            type="button"
          >
            <Copy aria-hidden="true" className="size-3.5" />
            Duplicate note
          </button>

          <button
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary"
            onClick={() => runAction(onExport)}
            role="menuitem"
            tabIndex={-1}
            type="button"
          >
            <Download aria-hidden="true" className="size-3.5" />
            Export Markdown
          </button>

          <button
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary"
            onClick={() => runAction(onPrint)}
            role="menuitem"
            tabIndex={-1}
            type="button"
          >
            <Printer aria-hidden="true" className="size-3.5" />
            Print note
          </button>

          <div aria-hidden="true" className="my-1 border-t border-border" />

          <button
            className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs text-danger transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-danger-subtle"
            onClick={() => runAction(onTrash)}
            role="menuitem"
            tabIndex={-1}
            type="button"
          >
            <Trash2 aria-hidden="true" className="size-3.5" />
            Move to trash
          </button>
        </div>
      ) : null}
    </div>
  );
}
