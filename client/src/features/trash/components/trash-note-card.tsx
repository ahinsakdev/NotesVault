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
      <div className="flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 min-w-0 text-sm font-semibold leading-5 tracking-[-0.02em] text-foreground">
          {note.title}
        </h2>

        <div className="flex shrink-0 items-center gap-1">
          <button
            aria-label={`Restore ${note.title}`}
            className="notesvault-focus-ring inline-flex size-7 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={() => onRestore(note)}
            title="Restore note"
            type="button"
          >
            <RotateCcw aria-hidden="true" className="size-3.5" />
          </button>

          <button
            aria-label={`Permanently delete ${note.title}`}
            className="notesvault-focus-ring inline-flex size-7 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-danger-subtle hover:text-danger"
            onClick={() => onDelete(note)}
            title="Delete permanently"
            type="button"
          >
            <Trash2 aria-hidden="true" className="size-3.5" />
          </button>
        </div>
      </div>

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

      </footer>
    </article>
  );
}
