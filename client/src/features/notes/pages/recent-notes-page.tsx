import { History } from "lucide-react";
import { useMemo } from "react";

import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/get-error-message";

import { NotesCollectionPage } from "../components/notes-collection-page";
import { useNotes } from "../hooks/use-notes";
import { useUpdateNoteState } from "../hooks/use-update-note-state";
import type { Note } from "../types/note.types";

export function RecentNotesPage() {
  const { data: notes = [], isError, isLoading, refetch } = useNotes();
  const updateNoteStateMutation = useUpdateNoteState();
  const { showToast } = useToast();

  async function handleArchive(note: Note) {
    if (updateNoteStateMutation.isPending) {
      return;
    }

    try {
      await updateNoteStateMutation.mutateAsync({
        noteId: note.id,
        updates: {
          isArchived: true,
        },
      });

      showToast({
        message: `"${note.title}" was moved to Archived.`,
        title: "Note archived",
        variant: "success",
      });
    } catch (error) {
      showToast({
        message: getErrorMessage(error),
        title: "Unable to archive note",
        variant: "error",
      });
    }
  }

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
      onArchive={(note) => {
        void handleArchive(note);
      }}
      onRetry={() => {
        void refetch();
      }}
      title="Recent notes"
    />
  );
}
