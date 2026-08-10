import type {
  GlobalSearchMatchField,
  GlobalSearchResult,
  GlobalSearchStatus,
} from "@/features/global-search/types/global-search.types";
import { NoteCard } from "@/features/notes/components/note-card";
import { NoteListItem } from "@/features/notes/components/note-list-item";
import type { NotesViewMode } from "@/features/notes/types/note.types";

import { SearchEmptyState } from "./search-empty-state";
import { SearchErrorState } from "./search-error-state";
import { SearchLoadingState } from "./search-loading-state";

type SearchResultsProps = {
  hasActiveFilters: boolean;
  query: string;
  results: GlobalSearchResult[];
  status: GlobalSearchStatus;
  view: NotesViewMode;
  onClearFilters: () => void;
  onRetry: () => void;
};

const matchLabels: Record<GlobalSearchMatchField, string> = {
  title: "Matched in title",
  preview: "Matched in preview",
  folder: "Matched in folder",
  tag: "Matched in tag",
};

export function SearchResults({
  hasActiveFilters,
  query,
  results,
  status,
  view,
  onClearFilters,
  onRetry,
}: SearchResultsProps) {
  if (status === "idle") {
    return <SearchIdleState />;
  }

  if (status === "loading") {
    return <SearchLoadingState />;
  }

  if (status === "error") {
    return <SearchErrorState onRetry={onRetry} />;
  }

  if (status === "empty") {
    return (
      <SearchEmptyState
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
        query={query}
      />
    );
  }

  return (
    <section aria-label="Search results">
      <div className="flex items-center justify-between border-b border-border px-1 pb-3">
        <p className="text-[10px] font-medium text-muted-foreground">
          {results.length} {results.length === 1 ? "note" : "notes"} found
        </p>

        <p className="hidden text-[10px] text-muted-foreground sm:block">
          Sorted by relevance and selected filters
        </p>
      </div>

      {view === "grid" ? (
        <div className="notes-grid mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {results.map((result) => (
            <div className="notes-grid-cell" key={result.note.id}>
              <SearchMatchLabel matchedField={result.matchedField} />
              <NoteCard note={result.note} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {results.map((result) => (
            <div key={result.note.id}>
              <SearchMatchLabel matchedField={result.matchedField} />
              <NoteListItem note={result.note} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

type SearchMatchLabelProps = {
  matchedField: GlobalSearchMatchField;
};

function SearchMatchLabel({ matchedField }: SearchMatchLabelProps) {
  return (
    <div className="border-x border-t border-border bg-surface-subtle px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
      {matchLabels[matchedField]}
    </div>
  );
}

function SearchIdleState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center">
      <div className="flex size-10 items-center justify-center bg-surface-subtle font-serif text-lg italic text-primary">
        N
      </div>

      <h2 className="mt-4 text-sm font-semibold text-foreground">
        Search your workspace
      </h2>

      <p className="mt-1 max-w-sm text-[11px] leading-5 text-muted-foreground">
        Find notes by title, preview, folder, or tag. Results will appear as you
        type.
      </p>
    </div>
  );
}
