import { BookOpen, Clock3, FileText, ListTree } from "lucide-react";

type NoteReadFooterProps = {
  headingCount: number;
  readingMinutes: number;
  wordCount: number;
  onOpenOutline: () => void;
};

export function NoteReadFooter({
  headingCount,
  readingMinutes,
  wordCount,
  onOpenOutline,
}: NoteReadFooterProps) {
  return (
    <footer className="sticky inset-x-0 bottom-0 z-40 shrink-0 border-t border-border bg-card/95 px-5 py-3 backdrop-blur sm:px-8">
      <div className="mx-auto flex w-full max-w-[1480px] flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-muted-foreground">
        <button
          aria-label="Open document outline"
          className="notesvault-focus-ring inline-flex h-8 items-center gap-1.5 border border-border bg-background px-2.5 font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          onClick={onOpenOutline}
          type="button"
        >
          <ListTree aria-hidden="true" className="size-3" />
          Outline
        </button>

        <span className="inline-flex items-center gap-1.5">
          <FileText aria-hidden="true" className="size-3" />
          {wordCount} words
        </span>

        <span className="inline-flex items-center gap-1.5">
          <ListTree aria-hidden="true" className="size-3" />
          {headingCount} headings
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Clock3 aria-hidden="true" className="size-3" />
          {readingMinutes} min read
        </span>

        <span className="ml-auto hidden items-center gap-1.5 sm:inline-flex">
          <BookOpen aria-hidden="true" className="size-3" />
          Press E to edit
        </span>
      </div>
    </footer>
  );
}
