import { Skeleton } from "@/components/ui/skeleton";

type NotesSkeletonProps = {
  view: "grid" | "list";
};

const gridSkeletonItems = Array.from({ length: 8 }, (_, index) => index);

const listSkeletonItems = Array.from({ length: 6 }, (_, index) => index);

function NoteCardSkeleton() {
  return (
    <article className="flex min-h-44 flex-col border border-border bg-card p-3">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="size-4 shrink-0" />
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[92%]" />
        <Skeleton className="h-3 w-3/4" />
      </div>

      <div className="mt-4 flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="mt-auto flex gap-4 border-t border-border pt-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-24" />
      </div>
    </article>
  );
}

function NoteListItemSkeleton() {
  return (
    <article className="grid gap-3 border border-border bg-card px-4 py-3 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto]">
      <div>
        <Skeleton className="h-4 w-48" />

        <div className="mt-3 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        <div className="mt-3 flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      <div className="flex items-center gap-4 md:flex-col md:items-start md:justify-center md:gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-24" />
      </div>

      <div className="hidden items-center justify-end gap-2 md:flex">
        <Skeleton className="size-4" />
        <Skeleton className="size-4" />
      </div>
    </article>
  );
}

export function NotesSkeleton({ view }: NotesSkeletonProps) {
  if (view === "list") {
    return (
      <section
        aria-label="Loading notes"
        aria-live="polite"
        className="space-y-3"
      >
        {listSkeletonItems.map((item) => (
          <NoteListItemSkeleton key={item} />
        ))}
      </section>
    );
  }

  return (
    <section
      aria-label="Loading notes"
      aria-live="polite"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {gridSkeletonItems.map((item) => (
        <NoteCardSkeleton key={item} />
      ))}
    </section>
  );
}
