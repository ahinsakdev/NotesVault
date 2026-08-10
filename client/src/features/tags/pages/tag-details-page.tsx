import { Tag } from "lucide-react";
import { useMemo } from "react";
import { Navigate, useParams } from "react-router";

import { ROUTES } from "@/app/routes";
import { NotesCollectionPage } from "@/features/notes/components/notes-collection-page";
import { useNotes } from "@/features/notes/hooks/use-notes";

export function TagDetailsPage() {
  const { tagId } = useParams();

  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const decodedTag = useMemo(() => {
    if (!tagId) {
      return null;
    }

    try {
      return decodeURIComponent(tagId);
    } catch {
      return null;
    }
  }, [tagId]);

  const activeNotes = useMemo(
    () => notes.filter((note) => !note.deletedAt && !note.isArchived),
    [notes],
  );

  const tagNotes = useMemo(() => {
    if (!decodedTag) {
      return [];
    }

    return activeNotes.filter((note) => note.tags.includes(decodedTag));
  }, [activeNotes, decodedTag]);

  const tagExists = useMemo(() => {
    if (!decodedTag) {
      return false;
    }

    return activeNotes.some((note) => note.tags.includes(decodedTag));
  }, [activeNotes, decodedTag]);

  if (!isLoading && !isError && !tagExists) {
    return <Navigate replace to={ROUTES.tags} />;
  }

  return (
    <NotesCollectionPage
      description={
        decodedTag
          ? `Browse notes classified with the ${decodedTag} tag.`
          : "Loading tagged notes."
      }
      emptyDescription="Notes using this tag will appear here."
      emptyIcon={Tag}
      emptyTitle="No notes with this tag"
      isError={isError}
      isLoading={isLoading}
      notes={tagNotes}
      onRetry={() => {
        void refetch();
      }}
      title={decodedTag ?? "Tag"}
    />
  );
}
