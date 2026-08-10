import { Star } from "lucide-react";
import { useMemo } from "react";

import { NotesCollectionPage } from "../components/notes-collection-page";
import { useNotes } from "../hooks/use-notes";

export function FavoritesPage() {
  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const favoriteNotes = useMemo(
    () =>
      notes.filter(
        (note) => note.isFavorite && !note.deletedAt && !note.isArchived,
      ),
    [notes],
  );

  return (
    <NotesCollectionPage
      description="Keep the notes you care about most within easy reach."
      emptyDescription="Notes you mark as favorites will appear here."
      emptyIcon={Star}
      emptyTitle="No favorite notes"
      isError={isError}
      isLoading={isLoading}
      notes={favoriteNotes}
      onRetry={() => {
        void refetch();
      }}
      title="Favorites"
    />
  );
}
