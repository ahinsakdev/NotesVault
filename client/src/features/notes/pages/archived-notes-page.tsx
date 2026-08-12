import { Archive } from "lucide-react";

import { NotesCollectionPage } from "../components/notes-collection-page";
import { useArchivedNotes } from "../hooks/use-archived-notes";

export function ArchivedNotesPage() {
  const {
    data: notes = [],
    isError,
    isLoading,
    refetch,
  } = useArchivedNotes();

  return (
    <NotesCollectionPage
      description="Keep older notes out of your active workspace without deleting them."
      emptyDescription="Notes you archive will appear here."
      emptyIcon={Archive}
      emptyTitle="No archived notes"
      isError={isError}
      isLoading={isLoading}
      notes={notes}
      onRetry={() => {
        void refetch();
      }}
      scope="archived"
      title="Archived notes"
    />
  );
}
