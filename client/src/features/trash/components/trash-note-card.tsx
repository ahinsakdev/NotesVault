import { Folder, RotateCcw, Trash2 } from "lucide-react";

import type { Note } from "@/features/notes/types/note.types";

import { formatDeletedDate } from "../utils/trash.utils";

type TrashNoteCardProps = {
  note: Note;
  onDelete: (note: Note) => void;
  onRestore: (note: Note) => void;
};

export function TrashNoteCard({
  note,
  onDelete,
  onRestore,
}: TrashNoteCardProps) {
  return (
    <article className="group relative z-0 flex min-h-48 flex-col overflow-hidden bg-card p-4 shadow-[0_1px_2px_rgb(39_31_26/0.04)] transition-[background-color,box-shadow,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] hover:z-10 hover:-translate-y-px hover:bg-surface-elevated hover:shadow-[0_14px_34px_rgb(39_31_26/0.09)] focus-within:z-10 focus-within:-translate-y-px focus-within:bg-surface-elevated focus-within:shadow-[0_14px_34px_rgb(39_31_26/0.09)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.18)] dark:hover:shadow-[0_18px_38px_rgb(0_0_0/0.28)] dark:focus-within:shadow-[0_18px_38px_rgb(0_0_0/0.28)]">
      <h2 className="line-clamp-2 text-sm font-semibold leading-5 tracking-[-0.02em] text-foreground">
        {note.title}
      </h2>

      <p className="mt-2 line-clamp-3 text-[11px] leading-[1.65] text-muted-foreground">
        {note.preview}
      </p>

      {note.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
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

      <footer className="mt-auto pt-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[9px] text-muted-foreground">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Folder aria-hidden="true" className="size-3 shrink-0" />
            <span className="truncate">{note.folderName}</span>
          </span>

          {note.deletedAt ? (
            <span>Deleted {formatDeletedDate(note.deletedAt)}</span>
          ) : null}
        </div>

        <div className="mt-3 flex translate-y-1.5 items-center gap-1.5 opacity-0 transition-[opacity,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-sm:translate-y-0 max-sm:opacity-100">
          <button
            aria-label={`Restore ${note.title}`}
            className="inline-flex h-7 items-center gap-1.5 bg-secondary px-2.5 text-[10px] font-medium text-secondary-foreground transition-[background-color,color] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onRestore(note)}
            type="button"
          >
            <RotateCcw aria-hidden="true" className="size-3" />
            Restore
          </button>

          <button
            aria-label={`Permanently delete ${note.title}`}
            className="inline-flex h-7 items-center gap-1.5 bg-danger px-2.5 text-[10px] font-medium text-white transition-opacity duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onDelete(note)}
            type="button"
          >
            <Trash2 aria-hidden="true" className="size-3" />
            Delete forever
          </button>
        </div>
      </footer>
    </article>
  );
}
