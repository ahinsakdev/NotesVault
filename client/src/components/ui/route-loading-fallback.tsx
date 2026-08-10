export function RouteLoadingFallback() {
  return (
    <div
      aria-label="Loading page"
      aria-live="polite"
      className="w-full"
      role="status"
    >
      <div className="animate-pulse space-y-5">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-surface-subtle" />
          <div className="h-7 w-56 max-w-full bg-surface-subtle" />
          <div className="h-3 w-80 max-w-full bg-surface-subtle" />
        </div>

        <div className="h-11 w-full border border-border bg-surface-subtle" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="h-40 border border-border bg-surface-subtle" />
          <div className="h-40 border border-border bg-surface-subtle" />
          <div className="hidden h-40 border border-border bg-surface-subtle xl:block" />
        </div>
      </div>
    </div>
  );
}
