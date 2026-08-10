import { Skeleton } from "@/components/ui/skeleton";

export function SearchLoadingState() {
  return (
    <div
      aria-label="Loading search results"
      className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 xl:grid-cols-3"
      role="status"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <div className="min-h-48 bg-card p-4" key={index}>
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-4 h-4 w-3/4" />
          <Skeleton className="mt-2 h-3 w-full" />
          <Skeleton className="mt-1.5 h-3 w-4/5" />

          <div className="mt-5 flex gap-1.5">
            <Skeleton className="h-5 w-14" />
            <Skeleton className="h-5 w-16" />
          </div>

          <Skeleton className="mt-7 h-px w-full" />
          <Skeleton className="mt-3 h-3 w-32" />
        </div>
      ))}
    </div>
  );
}
