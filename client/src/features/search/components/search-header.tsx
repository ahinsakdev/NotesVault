import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

import type { GlobalSearchStatus } from "@/features/global-search/types/global-search.types";

type SearchHeaderProps = {
  query: string;
  resultCount: number;
  status: GlobalSearchStatus;
  onClear: () => void;
  onQueryChange: (value: string) => void;
};

export function SearchHeader({
  query,
  resultCount,
  status,
  onClear,
  onQueryChange,
}: SearchHeaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Escape" || !query) {
      return;
    }

    event.preventDefault();
    onClear();
  }

  return (
    <section className="border-b border-border bg-card px-5 py-7 sm:px-7 sm:py-8 lg:px-9">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Search workspace
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
            Find anything in NotesVault
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm">
            Search note titles, content previews, folders, and tags from one
            place.
          </p>
        </div>

        <div className="mt-6 max-w-3xl">
          <label className="group flex h-12 w-full items-center border border-input bg-background transition-[border-color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] focus-within:border-ring focus-within:shadow-[inset_0_0_0_1px_var(--ring)]">
            <span className="flex h-full w-12 shrink-0 items-center justify-center text-muted-foreground transition-colors group-focus-within:text-foreground">
              <Search aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </span>

            <input
              aria-label="Search all notes"
              autoComplete="off"
              className="notesvault-search-page-input h-full min-w-0 flex-1 border-0 bg-transparent px-0 text-sm text-foreground placeholder:text-muted-foreground"
              onChange={(event) => onQueryChange(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search titles, previews, folders, and tags..."
              ref={inputRef}
              type="search"
              value={query}
            />

            {query ? (
              <button
                aria-label="Clear search"
                className="notesvault-focus-ring flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => {
                  onClear();
                  inputRef.current?.focus();
                }}
                title="Clear search"
                type="button"
              >
                <X aria-hidden="true" className="size-3.5" />
              </button>
            ) : null}

            <span className="flex h-full shrink-0 items-center px-3">
              <kbd className="border border-border bg-surface-subtle px-1.5 py-1 text-[9px] leading-none text-muted-foreground">
                ESC
              </kbd>
            </span>
          </label>

          <div className="mt-2.5 flex min-h-5 items-center justify-between gap-4 text-[10px] text-muted-foreground">
            <div
              aria-live="polite"
              aria-atomic="true"
              role="status"
            >
              <SearchSummary
                query={query}
                resultCount={resultCount}
                status={status}
              />
            </div>

            {query ? (
              <span className="hidden sm:inline">
                Results update as you type
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

type SearchSummaryProps = {
  query: string;
  resultCount: number;
  status: GlobalSearchStatus;
};

function SearchSummary({ query, resultCount, status }: SearchSummaryProps) {
  if (status === "idle") {
    return <span>Start typing to search your notes.</span>;
  }

  if (status === "loading") {
    return <span>Searching notes...</span>;
  }

  if (status === "error") {
    return <span>Search is currently unavailable.</span>;
  }

  if (status === "empty") {
    return (
      <span>
        No results found for <strong className="font-medium">“{query}”</strong>
      </span>
    );
  }

  return (
    <span>
      {resultCount} {resultCount === 1 ? "result" : "results"} for{" "}
      <strong className="font-medium text-foreground">“{query}”</strong>
    </span>
  );
}
