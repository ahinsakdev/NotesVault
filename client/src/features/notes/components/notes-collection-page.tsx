import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

import type { Note } from "../types/note.types";
import { useNotesFilters } from "../hooks/use-notes-filters";
import type { NotesCollectionScope } from "../utils/note.utils";
import { NotesErrorState } from "./notes-error-state";
import { NotesGrid } from "./notes-grid";
import { NotesHeader } from "./notes-header";
import { NotesList } from "./notes-list";
import { NotesSkeleton } from "./notes-skeleton";
import { NotesToolbar } from "./notes-toolbar";

type NotesCollectionPageProps = {
  actions?: ReactNode;
  description: string;
  emptyDescription: string;
  emptyIcon: LucideIcon;
  emptyTitle: string;
  isError: boolean;
  isLoading: boolean;
  notes: Note[];
  onRetry: () => void;
  scope?: NotesCollectionScope;
  title: string;
};

export function NotesCollectionPage({
  actions,
  description,
  emptyDescription,
  emptyIcon,
  emptyTitle,
  isError,
  isLoading,
  notes,
  onRetry,
  scope = "active",
  title,
}: NotesCollectionPageProps) {
  const navigate = useNavigate();

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
  } = useNotesFilters(notes, scope);

  function handleCreateNote() {
    navigate(ROUTES.noteDetails.replace(":noteId", "new"));
  }

  return (
    <div className="space-y-6">
      <NotesHeader
        actions={actions}
        description={description}
        isLoading={isLoading}
        noteCount={filteredNotes.length}
        title={title}
      />

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
            <NotesErrorState onRetry={onRetry} />
          ) : filteredNotes.length === 0 ? (
            <EmptyState
              actions={
                <>
                  {hasActiveFilters ? (
                    <Button onClick={clearFilters} size="sm" variant="outline">
                      Clear filters
                    </Button>
                  ) : null}

                  {!hasActiveFilters ? (
                    <Button onClick={handleCreateNote} size="sm">
                      New note
                    </Button>
                  ) : null}
                </>
              }
              description={
                hasActiveFilters
                  ? "Try changing your search or filter selection."
                  : emptyDescription
              }
              icon={emptyIcon}
              title={hasActiveFilters ? "No matching notes" : emptyTitle}
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
