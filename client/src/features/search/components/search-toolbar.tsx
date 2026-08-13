import { ArrowDownUp, Pin, RotateCcw, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NotesViewToggle } from "@/features/notes/components/notes-view-toggle";
import type {
  NotesFilterOptions,
  NotesViewMode,
} from "@/features/notes/types/note.types";
import { cn } from "@/utils/cn";

import type {
  SearchPageFilters,
  SearchPageSortOption,
} from "../types/search.types";

type SearchToolbarProps = {
  filters: SearchPageFilters;
  filterOptions: NotesFilterOptions;
  hasActiveFilters: boolean;
  isDisabled?: boolean;
  onClearFilters: () => void;
  onFavoritesOnlyChange: (value: boolean) => void;
  onFolderChange: (value: string) => void;
  onPinnedOnlyChange: (value: boolean) => void;
  onSortChange: (value: SearchPageSortOption) => void;
  onTagChange: (value: string) => void;
  onViewChange: (value: NotesViewMode) => void;
};

const sortOptions: {
  label: string;
  value: SearchPageSortOption;
}[] = [
  {
    label: "Most relevant",
    value: "relevance",
  },
  {
    label: "Recently updated",
    value: "updated-desc",
  },
  {
    label: "Oldest updated",
    value: "updated-asc",
  },
  {
    label: "Newest created",
    value: "created-desc",
  },
  {
    label: "Oldest created",
    value: "created-asc",
  },
  {
    label: "Title A–Z",
    value: "title-asc",
  },
  {
    label: "Title Z–A",
    value: "title-desc",
  },
];

export function SearchToolbar({
  filters,
  filterOptions,
  hasActiveFilters,
  isDisabled = false,
  onClearFilters,
  onFavoritesOnlyChange,
  onFolderChange,
  onPinnedOnlyChange,
  onSortChange,
  onTagChange,
  onViewChange,
}: SearchToolbarProps) {
  return (
    <section className="border-b border-border bg-surface-subtle px-5 py-3 sm:px-7 lg:px-9">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid gap-2 sm:grid-cols-3 xl:flex xl:items-center">
          <label className="block">
            <span className="sr-only">Filter search results by folder</span>

            <select
              className="h-8 w-full min-w-[9rem] border border-input bg-background px-2.5 text-xs text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70"
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
            <span className="sr-only">Filter search results by tag</span>

            <select
              className="h-8 w-full min-w-[8.5rem] border border-input bg-background px-2.5 text-xs text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70"
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

          <SearchSortSelect
            disabled={isDisabled}
            onChange={onSortChange}
            value={filters.sort}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SearchFilterToggle
            active={filters.favoritesOnly}
            disabled={isDisabled}
            icon={Star}
            label="Favorites"
            onClick={() => onFavoritesOnlyChange(!filters.favoritesOnly)}
          />

          <SearchFilterToggle
            active={filters.pinnedOnly}
            disabled={isDisabled}
            icon={Pin}
            label="Pinned"
            onClick={() => onPinnedOnlyChange(!filters.pinnedOnly)}
          />

          <NotesViewToggle onChange={onViewChange} value={filters.view} />

          {hasActiveFilters ? (
            <Button
              disabled={isDisabled}
              leftIcon={<RotateCcw className="size-3" />}
              onClick={onClearFilters}
              size="sm"
              variant="ghost"
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type SearchSortSelectProps = {
  value: SearchPageSortOption;
  disabled?: boolean;
  onChange: (value: SearchPageSortOption) => void;
};

function SearchSortSelect({
  disabled = false,
  value,
  onChange,
}: SearchSortSelectProps) {
  return (
    <label className="relative block shrink-0">
      <span className="sr-only">Sort search results</span>

      <ArrowDownUp
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground"
      />

      <select
        className="h-8 w-full min-w-[10rem] appearance-none border border-input bg-background pl-8 pr-7 text-xs text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70"
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.value as SearchPageSortOption)
        }
        value={value}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[8px] text-muted-foreground"
      >
        ▼
      </span>
    </label>
  );
}

type SearchFilterToggleProps = {
  active: boolean;
  disabled: boolean;
  icon: typeof Star;
  label: string;
  onClick: () => void;
};

function SearchFilterToggle({
  active,
  disabled,
  icon: Icon,
  label,
  onClick,
}: SearchFilterToggleProps) {
  return (
    <button
      aria-pressed={active}
      className={cn(
        "notesvault-focus-ring inline-flex h-8 items-center gap-1.5 border px-2.5 text-[10px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        active
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon
        aria-hidden="true"
        className="size-3"
        fill={active ? "currentColor" : "none"}
      />

      {label}
    </button>
  );
}
