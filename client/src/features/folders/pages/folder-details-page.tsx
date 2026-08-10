import { Folder } from "lucide-react";
import { useMemo } from "react";
import { Navigate, useParams } from "react-router";

import { ROUTES } from "@/app/routes";
import { NotesCollectionPage } from "@/features/notes/components/notes-collection-page";
import { useNotes } from "@/features/notes/hooks/use-notes";

export function FolderDetailsPage() {
  const { folderId } = useParams();

  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const activeNotes = useMemo(
    () => notes.filter((note) => !note.deletedAt && !note.isArchived),
    [notes],
  );

  const folderNotes = useMemo(
    () => activeNotes.filter((note) => note.folderId === folderId),
    [activeNotes, folderId],
  );

  const folderName = useMemo(
    () =>
      activeNotes.find((note) => note.folderId === folderId)?.folderName ??
      null,
    [activeNotes, folderId],
  );

  if (!isLoading && !isError && !folderName) {
    return <Navigate replace to={ROUTES.folders} />;
  }

  return (
    <NotesCollectionPage
      description={
        folderName
          ? `Browse and manage notes organized inside ${folderName}.`
          : "Loading folder notes."
      }
      emptyDescription="Notes assigned to this folder will appear here."
      emptyIcon={Folder}
      emptyTitle="No notes in this folder"
      isError={isError}
      isLoading={isLoading}
      notes={folderNotes}
      onRetry={() => {
        void refetch();
      }}
      title={folderName ?? "Folder"}
    />
  );
}
