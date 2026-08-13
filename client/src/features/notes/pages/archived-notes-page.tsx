import { Archive } from "lucide-react";
import { useState } from "react";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/get-error-message";

import { NotesCollectionPage } from "../components/notes-collection-page";
import { useArchivedNotes } from "../hooks/use-archived-notes";
import { useMoveNoteToTrash } from "../hooks/use-move-note-to-trash";
import { useUpdateNoteState } from "../hooks/use-update-note-state";
import type { Note } from "../types/note.types";

export function ArchivedNotesPage() {
  const {
    data: notes = [],
    isError,
    isLoading,
    refetch,
  } = useArchivedNotes();

  const updateNoteStateMutation = useUpdateNoteState();
  const moveNoteToTrashMutation = useMoveNoteToTrash();

  const { showToast } = useToast();

  const [pendingTrashNote, setPendingTrashNote] =
    useState<Note | null>(null);

  const isMutating =
    updateNoteStateMutation.isPending ||
    moveNoteToTrashMutation.isPending;

  async function handleUnarchive(note: Note) {
    if (isMutating) {
      return;
    }

    try {
      await updateNoteStateMutation.mutateAsync({
        noteId: note.id,
        updates: {
          isArchived: false,
        },
      });

      showToast({
        message: `"${note.title}" was returned to your active notes.`,
        title: "Note unarchived",
        variant: "success",
      });
    } catch (error) {
      showToast({
        message: getErrorMessage(error),
        title: "Unable to unarchive note",
        variant: "error",
      });
    }
  }

  function handleRequestTrash(note: Note) {
    if (isMutating) {
      return;
    }

    setPendingTrashNote(note);
  }

  async function handleConfirmTrash() {
    if (!pendingTrashNote || isMutating) {
      return;
    }

    const note = pendingTrashNote;

    try {
      await moveNoteToTrashMutation.mutateAsync(note.id);

      setPendingTrashNote(null);

      showToast({
        message: `"${note.title}" was moved to Trash.`,
        title: "Note moved to trash",
        variant: "success",
      });
    } catch (error) {
      showToast({
        message: getErrorMessage(error),
        title: "Unable to move note to trash",
        variant: "error",
      });
    }
  }

  return (
    <>
      <NotesCollectionPage
        description="Keep older notes out of your active workspace without deleting them."
        emptyDescription="Notes you archive will appear here."
        emptyIcon={Archive}
        emptyTitle="No archived notes"
        isError={isError}
        isLoading={isLoading}
        notes={notes}
        onMoveToTrash={handleRequestTrash}
        onRetry={() => {
          void refetch();
        }}
        onUnarchive={(note) => {
          void handleUnarchive(note);
        }}
        scope="archived"
        title="Archived notes"
      />

      <ConfirmDialog
        confirmLabel="Move to trash"
        description={
          pendingTrashNote
            ? `"${pendingTrashNote.title}" will be moved to Trash. You can restore it later.`
            : ""
        }
        isOpen={pendingTrashNote !== null}
        onCancel={() => {
          if (!isMutating) {
            setPendingTrashNote(null);
          }
        }}
        onConfirm={() => {
          void handleConfirmTrash();
        }}
        title="Move archived note to trash?"
        variant="danger"
      />
    </>
  );
}
