import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { NotesErrorState } from "@/features/notes/components/notes-error-state";
import { NotesSkeleton } from "@/features/notes/components/notes-skeleton";
import type { Note } from "@/features/notes/types/note.types";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/get-error-message";

import { TrashEmptyState } from "../components/trash-empty-state";
import { TrashNotesGrid } from "../components/trash-notes-grid";
import { useEmptyTrash } from "../hooks/use-empty-trash";
import { usePermanentlyDeleteNote } from "../hooks/use-permanently-delete-note";
import { useRestoreNote } from "../hooks/use-restore-note";
import { useTrashNotes } from "../hooks/use-trash-notes";

type PendingTrashAction =
  | {
      type: "delete-note";
      note: Note;
    }
  | {
      type: "empty-trash";
    }
  | null;

export function TrashPage() {
  const {
    data: trashNotes = [],
    isError,
    isLoading,
    refetch,
  } = useTrashNotes();

  const restoreNoteMutation = useRestoreNote();
  const permanentlyDeleteNoteMutation = usePermanentlyDeleteNote();
  const emptyTrashMutation = useEmptyTrash();

  const { showToast } = useToast();

  const [pendingAction, setPendingAction] =
    useState<PendingTrashAction>(null);

  const isMutating =
    restoreNoteMutation.isPending ||
    permanentlyDeleteNoteMutation.isPending ||
    emptyTrashMutation.isPending;

  async function handleRestore(note: Note) {
    if (isMutating) {
      return;
    }

    try {
      await restoreNoteMutation.mutateAsync(note.id);

      showToast({
        message: `"${note.title}" was restored to your notes.`,
        title: "Note restored",
        variant: "success",
      });
    } catch (error) {
      showToast({
        message: getErrorMessage(error),
        title: "Unable to restore note",
        variant: "error",
      });
    }
  }

  function handleRequestDelete(note: Note) {
    if (isMutating) {
      return;
    }

    setPendingAction({
      type: "delete-note",
      note,
    });
  }

  function handleRequestEmptyTrash() {
    if (trashNotes.length === 0 || isMutating) {
      return;
    }

    setPendingAction({
      type: "empty-trash",
    });
  }

  function handleCancelConfirmation() {
    if (isMutating) {
      return;
    }

    setPendingAction(null);
  }

  async function handleConfirmAction() {
    if (!pendingAction || isMutating) {
      return;
    }

    if (pendingAction.type === "delete-note") {
      const note = pendingAction.note;

      try {
        await permanentlyDeleteNoteMutation.mutateAsync(note.id);

        setPendingAction(null);

        showToast({
          message: `"${note.title}" was permanently deleted.`,
          title: "Note deleted",
          variant: "success",
        });
      } catch (error) {
        showToast({
          message: getErrorMessage(error),
          title: "Unable to delete note",
          variant: "error",
        });
      }

      return;
    }

    try {
      const deletedCount = await emptyTrashMutation.mutateAsync();

      setPendingAction(null);

      showToast({
        message:
          deletedCount === 1
            ? "1 note was permanently deleted."
            : `${deletedCount} notes were permanently deleted.`,
        title: "Trash emptied",
        variant: "success",
      });
    } catch (error) {
      showToast({
        message: getErrorMessage(error),
        title: "Unable to empty trash",
        variant: "error",
      });
    }
  }

  const isDeletingSingleNote = pendingAction?.type === "delete-note";

  const confirmTitle = isDeletingSingleNote
    ? "Delete note forever?"
    : "Empty trash?";

  const confirmDescription = isDeletingSingleNote
    ? `"${pendingAction.note.title}" will be permanently deleted. This action cannot be undone.`
    : `All ${trashNotes.length} ${
        trashNotes.length === 1 ? "note" : "notes"
      } in Trash will be permanently deleted. This action cannot be undone.`;

  const confirmLabel = isDeletingSingleNote
    ? "Delete forever"
    : "Empty trash";

  return (
    <>
      <div className="space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {isLoading
                ? "Loading trash"
                : `${trashNotes.length} ${
                    trashNotes.length === 1
                      ? "deleted note"
                      : "deleted notes"
                  }`}
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-foreground">
              Trash
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Restore deleted notes or permanently remove them from NotesVault.
            </p>
          </div>

          <Button
            disabled={isLoading || trashNotes.length === 0 || isMutating}
            leftIcon={<Trash2 aria-hidden="true" className="size-4" />}
            onClick={handleRequestEmptyTrash}
            variant="danger"
          >
            Empty trash
          </Button>
        </header>

        <section className="overflow-hidden border border-border bg-surface shadow-card">
          <div className="p-3 sm:p-4">
            {isLoading ? (
              <NotesSkeleton view="grid" />
            ) : isError ? (
              <NotesErrorState
                onRetry={() => {
                  void refetch();
                }}
              />
            ) : trashNotes.length === 0 ? (
              <TrashEmptyState />
            ) : (
              <TrashNotesGrid
                notes={trashNotes}
                onDelete={handleRequestDelete}
                onRestore={(note) => {
                  void handleRestore(note);
                }}
              />
            )}
          </div>
        </section>
      </div>

      <ConfirmDialog
        confirmLabel={confirmLabel}
        description={confirmDescription}
        isOpen={pendingAction !== null}
        onCancel={handleCancelConfirmation}
        onConfirm={() => {
          void handleConfirmAction();
        }}
        title={confirmTitle}
        variant="danger"
      />
    </>
  );
}
