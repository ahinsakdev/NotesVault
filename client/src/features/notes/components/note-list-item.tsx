import {
  Archive,
  ArchiveRestore,
  Clock3,
  Edit3,
  Eye,
  Folder,
  Pin,
  Star,
  Trash2,
} from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "@/app/routes";

import type { Note } from "../types/note.types";
import { formatNoteDate } from "../utils/note.utils";

type NoteListItemProps = {
  note: Note;
  onArchive?: (note: Note) => void;
  onMoveToTrash?: (note: Note) => void;
  onUnarchive?: (note: Note) => void;
};

export function NoteListItem({
  note,
  onArchive,
  onMoveToTrash,
  onUnarchive,
}: NoteListItemProps) {
  const readRoute = ROUTES.noteRead.replace(":noteId", note.id);
  const editRoute = ROUTES.noteDetails.replace(":noteId", note.id);

  return (
    <article className="group relative grid gap-3 overflow-hidden bg-card px-4 py-3.5 shadow-[0_1px_2px_rgb(39_31_26/0.04)] transition-[background-color,box-shadow,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] hover:-translate-y-px hover:bg-surface-elevated hover:shadow-[0_12px_28px_rgb(39_31_26/0.08)] focus-within:-translate-y-px focus-within:bg-surface-elevated focus-within:shadow-[0_12px_28px_rgb(39_31_26/0.08)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.18)] dark:hover:shadow-[0_16px_34px_rgb(0_0_0/0.26)] dark:focus-within:shadow-[0_16px_34px_rgb(0_0_0/0.26)] md:grid-cols-[minmax(0,1.55fr)_minmax(10rem,0.65fr)_auto]">
      <Link
        aria-label={`Read ${note.title}`}
        className="absolute inset-0 z-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        to={readRoute}
      />

      <div className="pointer-events-none relative z-10 min-w-0">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold tracking-[-0.02em] text-foreground">
              {note.title}
            </h2>

            <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-muted-foreground">
              {note.preview}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-primary md:hidden">
            {note.isPinned ? (
              <Pin
                aria-label="Pinned note"
                className="size-3.5"
                fill="currentColor"
                strokeWidth={1.8}
              />
            ) : null}

            {note.isFavorite ? (
              <Star
                aria-label="Favorite note"
                className="size-3.5"
                fill="currentColor"
                strokeWidth={1.8}
              />
            ) : null}
          </div>
        </div>

        {note.tags.length > 0 ? (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {note.tags.map((tag) => (
              <span
                className="bg-primary/8 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.07em] text-primary dark:bg-primary/12"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="pointer-events-none relative z-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] text-muted-foreground md:flex-col md:items-start md:justify-center md:gap-2">
        <span className="inline-flex min-w-0 items-center gap-1.5">
          <Folder aria-hidden="true" className="size-3 shrink-0" />
          <span className="truncate">{note.folderName}</span>
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Clock3 aria-hidden="true" className="size-3 shrink-0" />
          {formatNoteDate(note.updatedAt)}
        </span>
      </div>

      <div className="relative z-20 flex items-center gap-2 md:justify-end">
        <div className="hidden items-center gap-2 pr-1 text-primary md:flex">
          {note.isPinned ? (
            <Pin
              aria-label="Pinned note"
              className="size-3.5"
              fill="currentColor"
              strokeWidth={1.8}
            />
          ) : null}

          {note.isFavorite ? (
            <Star
              aria-label="Favorite note"
              className="size-3.5"
              fill="currentColor"
              strokeWidth={1.8}
            />
          ) : null}
        </div>

        <div className="flex translate-x-1.5 items-center gap-1.5 opacity-0 transition-[opacity,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 max-md:translate-x-0 max-md:opacity-100">
          <Link
            aria-label={`Read ${note.title}`}
            className="inline-flex h-7 items-center gap-1.5 bg-secondary px-2.5 text-[10px] font-medium text-secondary-foreground transition-[background-color,color] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            to={readRoute}
          >
            <Eye aria-hidden="true" className="size-3" />
            Read
          </Link>

          <Link
            aria-label={`Edit ${note.title}`}
            className="inline-flex h-7 items-center gap-1.5 bg-primary px-2.5 text-[10px] font-medium text-primary-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            to={editRoute}
          >
            <Edit3 aria-hidden="true" className="size-3" />
            Edit
          </Link>
        </div>

        {onArchive ? (
          <div className="flex items-center border-l border-border pl-2">
            <button
              aria-label={`Archive ${note.title}`}
              className="notesvault-focus-ring inline-flex size-7 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
              onClick={() => onArchive(note)}
              title="Archive note"
              type="button"
            >
              <Archive aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        ) : null}

        {onUnarchive || onMoveToTrash ? (
          <div className="flex items-center gap-1 border-l border-border pl-2">
            {onUnarchive ? (
              <button
                aria-label={`Unarchive ${note.title}`}
                className="notesvault-focus-ring inline-flex size-7 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
                onClick={() => onUnarchive(note)}
                title="Unarchive note"
                type="button"
              >
                <ArchiveRestore aria-hidden="true" className="size-3.5" />
              </button>
            ) : null}

            {onMoveToTrash ? (
              <button
                aria-label={`Move ${note.title} to trash`}
                className="notesvault-focus-ring inline-flex size-7 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-danger-subtle hover:text-danger"
                onClick={() => onMoveToTrash(note)}
                title="Move to trash"
                type="button"
              >
                <Trash2 aria-hidden="true" className="size-3.5" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
