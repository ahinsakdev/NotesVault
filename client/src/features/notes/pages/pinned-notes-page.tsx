import { Pin } from "lucide-react";
import { useMemo } from "react";

import { NotesCollectionPage } from "../components/notes-collection-page";
import { useNotes } from "../hooks/use-notes";

export function PinnedNotesPage() {
  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const pinnedNotes = useMemo(
    () =>
      notes.filter(
        (note) => note.isPinned && !note.deletedAt && !note.isArchived,
      ),
    [notes],
  );

  return (
    <NotesCollectionPage
      description="Keep important notes fixed at the top of your workspace."
      emptyDescription="Notes you pin will appear here for quick access."
      emptyIcon={Pin}
      emptyTitle="No pinned notes"
      isError={isError}
      isLoading={isLoading}
      notes={pinnedNotes}
      onRetry={() => {
        void refetch();
      }}
      title="Pinned notes"
    />
  );
}
