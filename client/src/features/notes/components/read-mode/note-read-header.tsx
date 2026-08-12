import {
  Archive,
  ArchiveRestore,
  ArrowLeft,
  Edit3,
  MoreHorizontal,
  Pin,
  Printer,
  Share2,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import type { RefObject } from "react";
import { Link } from "react-router";

import { ROUTES } from "@/app/routes";
import { cn } from "@/utils/cn";

import { NoteReadProgress } from "./note-read-progress";

type NoteReadHeaderProps = {
  isArchived: boolean;
  isCompact: boolean;
  isFavorite: boolean;
  isPinned: boolean;
  isPreferencesOpen: boolean;
  noteId: string;
  noteTitle: string;
  onArchiveChange: () => void;
  onFavoriteChange: () => void;
  onOpenPreferences: () => void;
  onPinnedChange: () => void;
  isStateUpdating: boolean;
  preferencesTriggerRef: RefObject<HTMLButtonElement | null>;
};

export function NoteReadHeader({
  isArchived,
  isCompact,
  isFavorite,
  isPinned,
  isPreferencesOpen,
  noteId,
  noteTitle,
  onArchiveChange,
  onFavoriteChange,
  onOpenPreferences,
  onPinnedChange,
  isStateUpdating,
  preferencesTriggerRef,
}: NoteReadHeaderProps) {
  const editRoute = ROUTES.noteDetails.replace(":noteId", noteId);

  return (
    <header
      className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur"
      data-compact={isCompact ? "true" : "false"}
    >
      <div
        className={cn(
          "flex items-center gap-2 px-3 transition-[min-height,padding] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] sm:px-5",
          isCompact ? "min-h-11 py-1.5" : "min-h-13 py-2",
        )}
      >
        <Link
          aria-label="Back to all notes"
          className={cn(
            "notesvault-focus-ring inline-flex shrink-0 items-center text-xs font-medium text-muted-foreground transition-[height,padding,background-color,color] duration-[var(--motion-standard)] hover:bg-secondary hover:text-foreground",
            isCompact ? "size-8 justify-center p-0" : "h-8 gap-2 px-2",
          )}
          title="Back to all notes"
          to={ROUTES.notes}
        >
          <ArrowLeft aria-hidden="true" className="size-3.5 shrink-0" />

          <span
            className={cn(
              "overflow-hidden whitespace-nowrap transition-[max-width,opacity,transform] duration-[var(--motion-standard)]",
              isCompact
                ? "max-w-0 -translate-y-0.5 opacity-0"
                : "max-w-20 translate-y-0 opacity-100",
            )}
          >
            All notes
          </span>
        </Link>

        <div
          aria-hidden="true"
          className={cn(
            "hidden w-px bg-border transition-[height,opacity] duration-[var(--motion-standard)] sm:block",
            isCompact ? "h-0 opacity-0" : "h-4 opacity-100",
          )}
        />

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate text-foreground transition-[font-size,font-weight] duration-[var(--motion-standard)]",
              isCompact ? "text-[13px] font-semibold" : "text-xs font-medium",
            )}
          >
            {noteTitle}
          </p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <div
            aria-hidden={isCompact}
            className={cn(
              "hidden items-center gap-1.5 overflow-hidden transition-[max-width,opacity,transform] duration-[var(--motion-standard)] sm:flex",
              isCompact
                ? "pointer-events-none max-w-0 -translate-y-0.5 opacity-0"
                : "max-w-52 translate-y-0 opacity-100",
            )}
          >
            <button
              aria-label="Print note"
              className="notesvault-focus-ring inline-flex h-8 items-center gap-1.5 border border-border bg-background px-2.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => window.print()}
              tabIndex={isCompact ? -1 : 0}
              title="Print note"
              type="button"
            >
              <Printer aria-hidden="true" className="size-3" />
              Print
            </button>

            <button
              aria-label="Share note"
              className="notesvault-focus-ring inline-flex h-8 items-center gap-1.5 border border-border bg-background px-2.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              tabIndex={isCompact ? -1 : 0}
              title="Share note"
              type="button"
            >
              <Share2 aria-hidden="true" className="size-3" />
              Share
            </button>

            <button
              aria-label="More note actions"
              className="notesvault-focus-ring flex size-8 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              tabIndex={isCompact ? -1 : 0}
              title="More actions"
              type="button"
            >
              <MoreHorizontal aria-hidden="true" className="size-3.5" />
            </button>
          </div>

          <button
            aria-label={isArchived ? "Unarchive note" : "Archive note"}
            className="notesvault-focus-ring flex size-8 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            disabled={isStateUpdating}
            onClick={onArchiveChange}
            title={isArchived ? "Unarchive note" : "Archive note"}
            type="button"
          >
            {isArchived ? (
              <ArchiveRestore aria-hidden="true" className="size-3.5" />
            ) : (
              <Archive aria-hidden="true" className="size-3.5" />
            )}
          </button>

          <button
            aria-label={isPinned ? "Pinned note" : "Pin note"}
            className="notesvault-focus-ring flex size-8 items-center justify-center border border-border bg-background transition-colors hover:bg-secondary"
            disabled={isStateUpdating}
            onClick={onPinnedChange}
            title={isPinned ? "Unpin note" : "Pin note"}
            type="button"
          >
            <Pin
              aria-hidden="true"
              className={cn(
                "size-3.5",
                isPinned ? "text-primary" : "text-muted-foreground",
              )}
              fill={isPinned ? "currentColor" : "none"}
            />
          </button>

          <button
            aria-label={isFavorite ? "Favorite note" : "Add to favorites"}
            className="notesvault-focus-ring flex size-8 items-center justify-center border border-border bg-background transition-colors hover:bg-secondary"
            disabled={isStateUpdating}
            onClick={onFavoriteChange}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            type="button"
          >
            <Star
              aria-hidden="true"
              className={cn(
                "size-3.5",
                isFavorite ? "text-primary" : "text-muted-foreground",
              )}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>

          <button
            aria-controls="notesvault-reading-preferences"
            aria-expanded={isPreferencesOpen}
            aria-label="Open reading preferences"
            className="notesvault-focus-ring flex size-8 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            onClick={onOpenPreferences}
            ref={preferencesTriggerRef}
            title="Reading preferences"
            type="button"
          >
            <SlidersHorizontal aria-hidden="true" className="size-3.5" />
          </button>

          <Link
            className={cn(
              "notesvault-focus-ring inline-flex h-8 items-center bg-primary text-[10px] font-medium text-primary-foreground transition-[padding,background-color] hover:bg-primary-hover",
              isCompact ? "px-2.5" : "gap-1.5 px-3",
            )}
            title="Edit note (E)"
            to={editRoute}
          >
            <Edit3 aria-hidden="true" className="size-3 shrink-0" />

            <span className={cn(isCompact && "hidden sm:inline")}>
              {isCompact ? "Edit" : "Edit note"}
            </span>
          </Link>
        </div>
      </div>

      <NoteReadProgress />
    </header>
  );
}
