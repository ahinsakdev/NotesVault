import { Plus, Tags } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { NotesErrorState } from "@/features/notes/components/notes-error-state";
import { useNotes } from "@/features/notes/hooks/use-notes";

import { TagsGrid } from "../components/tags-grid";
import { getTagsFromNotes } from "../utils/tag.utils";

export function TagsPage() {
  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const tags = useMemo(() => getTagsFromNotes(notes), [notes]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {isLoading
              ? "Loading your tags"
              : `${tags.length} ${tags.length === 1 ? "tag" : "tags"}`}
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-foreground">
            Tags
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Classify notes across folders and find related ideas faster.
          </p>
        </div>

        <Button
          disabled
          leftIcon={<Plus aria-hidden="true" className="size-4" />}
          title="Tag creation is not available yet"
        >
          New tag
        </Button>
      </header>

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className="min-h-32 animate-pulse border border-border bg-card p-4"
              key={index}
            >
              <div className="size-9 bg-surface-subtle" />
              <div className="mt-5 h-3 w-24 bg-surface-subtle" />
              <div className="mt-2 h-2.5 w-36 bg-surface-subtle" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <NotesErrorState
          onRetry={() => {
            void refetch();
          }}
        />
      ) : tags.length === 0 ? (
        <EmptyState
          description="Add tags to your notes to create reusable classifications."
          icon={Tags}
          title="No tags yet"
        />
      ) : (
        <TagsGrid tags={tags} />
      )}
    </div>
  );
}
