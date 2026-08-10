import { Clock3, Edit3, Eye, Folder, Pin, Star } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "@/app/routes";

import type { DashboardNote } from "../types/dashboard.types";

type NoteCardProps = {
  note: DashboardNote;
};

export function NoteCard({ note }: NoteCardProps) {
  const readRoute = ROUTES.noteRead.replace(":noteId", note.id);
  const editRoute = ROUTES.noteDetails.replace(":noteId", note.id);

  return (
    <article className="group relative flex min-h-44 flex-col overflow-hidden bg-card px-4 py-3.5 shadow-[0_1px_2px_rgb(39_31_26/0.04)] transition-[background-color,box-shadow,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] hover:-translate-y-px hover:bg-surface-elevated hover:shadow-[0_14px_34px_rgb(39_31_26/0.09)] focus-within:-translate-y-px focus-within:bg-surface-elevated focus-within:shadow-[0_14px_34px_rgb(39_31_26/0.09)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.18)] dark:hover:shadow-[0_18px_38px_rgb(0_0_0/0.28)] dark:focus-within:shadow-[0_18px_38px_rgb(0_0_0/0.28)]">
      <Link
        aria-label={`Read ${note.title}`}
        className="absolute inset-0 z-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        to={readRoute}
      />

      <div className="pointer-events-none relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold tracking-[-0.015em] text-foreground">
            {note.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.65] text-muted-foreground">
            {note.preview}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-primary">
          {note.isPinned ? (
            <Pin
              aria-label="Pinned"
              className="size-3.5"
              fill="currentColor"
              strokeWidth={1.8}
            />
          ) : null}

          {note.isFavorite ? (
            <Star
              aria-label="Favorite"
              className="size-3.5"
              fill="currentColor"
              strokeWidth={1.8}
            />
          ) : null}
        </div>
      </div>

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
        <div className="pointer-events-none flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Folder aria-hidden="true" className="size-3 shrink-0" />
            <span className="truncate">{note.folder}</span>
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-3 shrink-0" />
            {note.updatedAt}
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
