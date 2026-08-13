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

type NoteCardProps = {
  note: Note;
  onArchive?: (note: Note) => void;
  onMoveToTrash?: (note: Note) => void;
  onUnarchive?: (note: Note) => void;
};

export function NoteCard({
  note,
  onArchive,
  onMoveToTrash,
  onUnarchive,
}: NoteCardProps) {
  const readRoute = ROUTES.noteRead.replace(":noteId", note.id);
  const editRoute = ROUTES.noteDetails.replace(":noteId", note.id);

  return (
    <article className="group relative z-0 flex min-h-48 flex-col overflow-hidden bg-card p-4 shadow-[0_1px_2px_rgb(39_31_26/0.04)] transition-[background-color,box-shadow,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] hover:z-10 hover:-translate-y-px hover:bg-surface-elevated hover:shadow-[0_14px_34px_rgb(39_31_26/0.09)] focus-within:z-10 focus-within:-translate-y-px focus-within:bg-surface-elevated focus-within:shadow-[0_14px_34px_rgb(39_31_26/0.09)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.18)] dark:hover:shadow-[0_18px_38px_rgb(0_0_0/0.28)] dark:focus-within:shadow-[0_18px_38px_rgb(0_0_0/0.28)]">
      <Link
        aria-label={`Read ${note.title}`}
        className="absolute inset-0 z-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        to={readRoute}
      />

      <div className="relative z-20 flex items-start justify-between gap-3">
        <h2 className="pointer-events-none line-clamp-2 min-w-0 text-sm font-semibold leading-5 tracking-[-0.02em] text-foreground">
          {note.title}
        </h2>

        <div className="flex shrink-0 items-center gap-1">
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

          {!onUnarchive && !onMoveToTrash ? (
            <>
              <div className="pointer-events-none flex items-center gap-2 text-primary">
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

              {onArchive ? (
                <button
                  aria-label={`Archive ${note.title}`}
                  className="notesvault-focus-ring inline-flex size-7 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
                  onClick={() => onArchive(note)}
                  title="Archive note"
                  type="button"
                >
                  <Archive aria-hidden="true" className="size-3.5" />
                </button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      <p className="pointer-events-none relative z-10 mt-2 line-clamp-3 text-[11px] leading-[1.65] text-muted-foreground">
        {note.preview}
      </p>

      {note.tags.length > 0 ? (
        <div className="pointer-events-none relative z-10 mt-3 flex flex-wrap gap-1.5">
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

      <footer className="relative z-10 mt-auto pt-4">
        <div className="pointer-events-none flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[9px] text-muted-foreground">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Folder aria-hidden="true" className="size-3 shrink-0" />
            <span className="truncate">{note.folderName}</span>
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-3 shrink-0" />
            {formatNoteDate(note.updatedAt)}
          </span>
        </div>

        <div className="relative z-20 mt-3 flex translate-y-1.5 items-center gap-1.5 opacity-0 transition-[opacity,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-sm:translate-y-0 max-sm:opacity-100">
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
      </footer>
    </article>
  );
}
