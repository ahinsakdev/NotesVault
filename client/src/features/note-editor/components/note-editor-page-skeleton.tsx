import { Skeleton } from "@/components/ui/skeleton";

export function NoteEditorPageSkeleton() {
  return (
    <div
      aria-label="Loading note editor"
      aria-live="polite"
      className="overflow-hidden border border-border bg-card"
    >
      <header className="flex h-14 items-center gap-3 border-b border-border px-5 sm:px-6">
        <Skeleton className="size-8" />

        <div className="space-y-1.5">
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-2.5 w-24" />
        </div>

        <div className="ml-auto flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
        </div>
      </header>

      <div className="flex flex-col xl:flex-row">
        <section className="min-w-0 flex-1">
          <div className="px-5 py-5 sm:px-7">
            <Skeleton className="h-8 w-2/3" />
          </div>

          <div className="flex h-11 items-center gap-2 border-y border-border bg-surface-subtle px-3">
            {Array.from({ length: 10 }, (_, index) => (
              <Skeleton className="size-7" key={index} />
            ))}
          </div>

          <div className="space-y-3 px-5 py-6 sm:px-7">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[94%]" />
            <Skeleton className="h-3 w-[88%]" />
            <Skeleton className="h-3 w-[96%]" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </section>

        <aside className="w-full border-t border-border bg-surface-subtle p-4 xl:w-72 xl:border-l xl:border-t-0">
          <Skeleton className="h-3 w-24" />

          <div className="mt-5 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </aside>
      </div>
    </div>
  );
}
