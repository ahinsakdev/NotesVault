import { SearchHeader } from "../components/search-header";
import { SearchResults } from "../components/search-results";
import { SearchToolbar } from "../components/search-toolbar";
import { useSearchPage } from "../hooks/use-search-page";

export function SearchPage() {
  const {
    clearFilters,
    clearSearch,
    filterOptions,
    filters,
    hasActiveFilters,
    query,
    refetch,
    results,
    setFavoritesOnly,
    setFolder,
    setPinnedOnly,
    setSort,
    setTag,
    setView,
    status,
    updateQuery,
  } = useSearchPage();

  const isToolbarDisabled =
    status === "idle" || status === "loading" || status === "error";

  return (
    <div className="overflow-hidden border border-border bg-card shadow-card">
      <SearchHeader
        onClear={clearSearch}
        onQueryChange={updateQuery}
        query={query}
        resultCount={results.length}
        status={status}
      />

      <SearchToolbar
        filterOptions={filterOptions}
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        isDisabled={isToolbarDisabled}
        onClearFilters={clearFilters}
        onFavoritesOnlyChange={setFavoritesOnly}
        onFolderChange={setFolder}
        onPinnedOnlyChange={setPinnedOnly}
        onSortChange={setSort}
        onTagChange={setTag}
        onViewChange={setView}
      />

      <div className="min-h-72 bg-card px-5 py-6 sm:px-7 lg:px-9">
        <div className="mx-auto w-full max-w-[1120px]">
          <SearchResults
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            onRetry={() => {
              void refetch();
            }}
            query={query}
            results={results}
            status={status}
            view={filters.view}
          />
        </div>
      </div>
    </div>
  );
}
