import { Skeleton } from "@/components/ui/skeleton";

const statisticSkeletons = Array.from({ length: 4 }, (_, index) => index);
const noteSkeletons = Array.from({ length: 2 }, (_, index) => index);
const folderSkeletons = Array.from({ length: 4 }, (_, index) => index);

function DashboardNoteSkeleton() {
  return (
    <div className="border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-40 max-w-full" />
          <Skeleton className="mt-3 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-4/5" />
        </div>

        <Skeleton className="size-4 shrink-0" />
      </div>

      <div className="mt-4 flex gap-2">
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-5 w-16" />
      </div>

      <div className="mt-4 flex justify-between border-t border-border pt-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function DashboardLoadingState() {
  return (
    <div
      aria-label="Loading dashboard"
      aria-live="polite"
      className="animate-pulse space-y-6"
      role="status"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-2 h-7 w-36" />
        </div>

        <Skeleton className="h-10 w-28" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statisticSkeletons.map((item) => (
          <div
            className="flex items-center gap-4 border border-border bg-card px-4 py-4"
            key={item}
          >
            <Skeleton className="size-10 shrink-0" />

            <div className="min-w-0 flex-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2 h-6 w-10" />
              <Skeleton className="mt-2 h-3 w-24" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-2">
        {[0, 1].map((section) => (
          <section key={section}>
            <div className="mb-4">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="mt-2 h-3 w-52 max-w-full" />
            </div>

            <div className="space-y-3">
              {noteSkeletons.map((item) => (
                <DashboardNoteSkeleton key={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section>
        <div className="mb-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-3 w-56 max-w-full" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {folderSkeletons.map((item) => (
            <div className="border border-border bg-card p-4" key={item}>
              <Skeleton className="size-8" />
              <Skeleton className="mt-4 h-4 w-28" />
              <Skeleton className="mt-2 h-3 w-20" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
