import { NotesEmptyState } from "../components/notes-empty-state";
import { NotesErrorState } from "../components/notes-error-state";
import { NotesGrid } from "../components/notes-grid";
import { NotesHeader } from "../components/notes-header";
import { NotesList } from "../components/notes-list";
import { NotesSkeleton } from "../components/notes-skeleton";
import { NotesToolbar } from "../components/notes-toolbar";
import { useNotes } from "../hooks/use-notes";
import { useNotesFilters } from "../hooks/use-notes-filters";

export function NotesPage() {
  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const {
    filters,
    filteredNotes,
    filterOptions,
    hasActiveFilters,
    clearFilters,
    setFolder,
    setSearch,
    setSort,
    setTag,
    setView,
  } = useNotesFilters(notes);

  return (
    <div className="space-y-6">
      <NotesHeader isLoading={isLoading} noteCount={filteredNotes.length} />

      <section className="overflow-hidden border border-border bg-surface shadow-card">
        <NotesToolbar
          filterOptions={filterOptions}
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          isDisabled={isLoading}
          onClearFilters={clearFilters}
          onFolderChange={setFolder}
          onSearchChange={setSearch}
          onSortChange={setSort}
          onTagChange={setTag}
          onViewChange={setView}
        />

        <div className="p-3 sm:p-4">
          {isLoading ? (
            <NotesSkeleton view={filters.view} />
          ) : isError ? (
            <NotesErrorState
              onRetry={() => {
                void refetch();
              }}
            />
          ) : filteredNotes.length === 0 ? (
            <NotesEmptyState
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
            />
          ) : filters.view === "grid" ? (
            <NotesGrid notes={filteredNotes} />
          ) : (
            <NotesList notes={filteredNotes} />
          )}
        </div>
      </section>
    </div>
  );
}
