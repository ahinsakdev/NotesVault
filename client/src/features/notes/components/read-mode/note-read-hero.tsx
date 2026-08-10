import { CalendarDays, Clock3, FileText, Folder, Tag } from "lucide-react";

import type { Note } from "../../types/note.types";

type NoteReadHeroProps = {
  note: Note;
  readingMinutes: number;
  wordCount: number;
};

function formatReaderDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function NoteReadHero({
  note,
  readingMinutes,
  wordCount,
}: NoteReadHeroProps) {
  return (
    <section className="border-b border-border px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="font-sans text-2xl font-normal leading-[1.12] tracking-[-0.025em] text-foreground sm:text-3xl lg:text-[2.75rem]">
          {note.title}
        </h1>

        <div className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[10px] text-muted-foreground sm:mt-5 sm:gap-x-3 sm:gap-y-2 sm:text-[11px]">
          <span className="inline-flex items-center gap-1.5">
            <Folder aria-hidden="true" className="size-3" />
            {note.folderName}
          </span>

          {note.tags.map((tag) => (
            <span className="inline-flex items-center gap-1.5" key={tag}>
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-border"
              />
              <Tag aria-hidden="true" className="size-3" />
              {tag}
            </span>
          ))}

          <span aria-hidden="true" className="size-1 rounded-full bg-border" />

          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="size-3" />
            Updated {formatReaderDate(note.updatedAt)}
          </span>

          <span aria-hidden="true" className="size-1 rounded-full bg-border" />

          <span className="inline-flex items-center gap-1.5">
            <FileText aria-hidden="true" className="size-3" />
            {wordCount} words
          </span>

          <span aria-hidden="true" className="size-1 rounded-full bg-border" />

          <span className="inline-flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="size-3" />
            {readingMinutes} min read
          </span>
        </div>
      </div>
    </section>
  );
}
