import { SearchX } from "lucide-react";

type SearchEmptyStateProps = {
  hasActiveFilters: boolean;
  query: string;
  onClearFilters: () => void;
};

export function SearchEmptyState({
  hasActiveFilters,
  query,
  onClearFilters,
}: SearchEmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center">
      <div className="flex size-10 items-center justify-center bg-surface-subtle text-muted-foreground">
        <SearchX aria-hidden="true" className="size-4" strokeWidth={1.8} />
      </div>

      <h2 className="mt-4 text-sm font-semibold text-foreground">
        No matching notes
      </h2>

      <p className="mt-1 max-w-sm text-[11px] leading-5 text-muted-foreground">
        No notes matched “{query}”
        {hasActiveFilters ? " with the selected filters." : "."}
      </p>

      {hasActiveFilters ? (
        <button
          className="notesvault-focus-ring mt-4 h-8 border border-border bg-background px-3 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          onClick={onClearFilters}
          type="button"
        >
          Clear filters
        </button>
      ) : null}
    </div>
  );
}
