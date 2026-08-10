import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  NotesFilterOptions,
  NotesFilters,
  NotesSortOption,
  NotesViewMode,
} from "../types/note.types";
import { NotesSearch } from "./notes-search";
import { NotesSortSelect } from "./notes-sort-select";
import { NotesViewToggle } from "./notes-view-toggle";

type NotesToolbarProps = {
  filters: NotesFilters;
  filterOptions: NotesFilterOptions;
  hasActiveFilters: boolean;
  isDisabled?: boolean;
  onSearchChange: (value: string) => void;
  onFolderChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onSortChange: (value: NotesSortOption) => void;
  onViewChange: (value: NotesViewMode) => void;
  onClearFilters: () => void;
};

export function NotesToolbar({
  filters,
  filterOptions,
  hasActiveFilters,
  isDisabled = false,
  onClearFilters,
  onFolderChange,
  onSearchChange,
  onSortChange,
  onTagChange,
  onViewChange,
}: NotesToolbarProps) {
  return (
    <section className="space-y-3 border-b border-border bg-surface-subtle px-3 py-3 sm:px-4">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <NotesSearch
          disabled={isDisabled}
          onChange={onSearchChange}
          value={filters.search}
        />

        <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:shrink-0">
          <label className="block">
            <span className="sr-only">Filter by folder</span>

            <select
              className="h-8 w-full min-w-[8.75rem] border border-input bg-background px-2.5 text-xs text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70"
              disabled={isDisabled}
              onChange={(event) => onFolderChange(event.target.value)}
              value={filters.folder}
            >
              <option value="all">All folders</option>

              {filterOptions.folders.map((folder) => (
                <option key={folder} value={folder}>
                  {folder}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Filter by tag</span>

            <select
              className="h-8 w-full min-w-[8rem] border border-input bg-background px-2.5 text-xs text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70"
              disabled={isDisabled}
              onChange={(event) => onTagChange(event.target.value)}
              value={filters.tag}
            >
              <option value="all">All tags</option>

              {filterOptions.tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <NotesSortSelect onChange={onSortChange} value={filters.sort} />

          {hasActiveFilters ? (
            <Button
              leftIcon={<RotateCcw className="size-3" />}
              onClick={onClearFilters}
              size="sm"
              variant="ghost"
            >
              Clear filters
            </Button>
          ) : null}
        </div>

        <NotesViewToggle onChange={onViewChange} value={filters.view} />
      </div>
    </section>
  );
}
