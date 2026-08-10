import { History } from "lucide-react";
import { useMemo } from "react";

import { NotesCollectionPage } from "../components/notes-collection-page";
import { useNotes } from "../hooks/use-notes";

export function RecentNotesPage() {
  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const recentNotes = useMemo(
    () =>
      notes
        .filter((note) => !note.deletedAt && !note.isArchived)
        .toSorted(
          (first, second) =>
            new Date(second.updatedAt).getTime() -
            new Date(first.updatedAt).getTime(),
        ),
    [notes],
  );

  return (
    <NotesCollectionPage
      description="Quickly return to notes you've worked on most recently."
      emptyDescription="Your recently updated notes will appear here."
      emptyIcon={History}
      emptyTitle="No recent notes"
      isError={isError}
      isLoading={isLoading}
      notes={recentNotes}
      onRetry={() => {
        void refetch();
      }}
      title="Recent notes"
    />
  );
}
