import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { NotesErrorState } from "@/features/notes/components/notes-error-state";
import { NotesSkeleton } from "@/features/notes/components/notes-skeleton";
import { useNotes } from "@/features/notes/hooks/use-notes";
import type { Note } from "@/features/notes/types/note.types";
import { useToast } from "@/hooks/use-toast";

import { TrashEmptyState } from "../components/trash-empty-state";
import { TrashNotesGrid } from "../components/trash-notes-grid";
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
  const { data: notes = [], isError, isLoading, refetch } = useNotes();

  const { emptyTrash, permanentlyDeleteNote, restoreNote, visibleTrashNotes } =
    useTrashNotes(notes);

  const { showToast } = useToast();

  const [pendingAction, setPendingAction] = useState<PendingTrashAction>(null);

  function handleRestore(note: Note) {
    restoreNote(note.id);

    showToast({
      message: `"${note.title}" was restored to your notes.`,
      title: "Note restored",
      variant: "success",
    });
  }

  function handleRequestDelete(note: Note) {
    setPendingAction({
      type: "delete-note",
      note,
    });
  }

  function handleRequestEmptyTrash() {
    if (visibleTrashNotes.length === 0) {
      return;
    }

    setPendingAction({
      type: "empty-trash",
    });
  }

  function handleCancelConfirmation() {
    setPendingAction(null);
  }

  function handleConfirmAction() {
    if (!pendingAction) {
      return;
    }

    if (pendingAction.type === "delete-note") {
      permanentlyDeleteNote(pendingAction.note.id);

      showToast({
        message: `"${pendingAction.note.title}" was permanently deleted.`,
        title: "Note deleted",
        variant: "success",
      });

      setPendingAction(null);
      return;
    }

    const deletedCount = visibleTrashNotes.length;

    emptyTrash();

    showToast({
      message:
        deletedCount === 1
          ? "1 note was permanently deleted."
          : `${deletedCount} notes were permanently deleted.`,
      title: "Trash emptied",
      variant: "success",
    });

    setPendingAction(null);
  }

  const isDeletingSingleNote = pendingAction?.type === "delete-note";

  const confirmTitle = isDeletingSingleNote
    ? "Delete note forever?"
    : "Empty trash?";

  const confirmDescription = isDeletingSingleNote
    ? `"${pendingAction.note.title}" will be permanently deleted. This action cannot be undone.`
    : `All ${visibleTrashNotes.length} ${
        visibleTrashNotes.length === 1 ? "note" : "notes"
      } in Trash will be permanently deleted. This action cannot be undone.`;

  const confirmLabel = isDeletingSingleNote ? "Delete forever" : "Empty trash";

  return (
    <>
      <div className="space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {isLoading
                ? "Loading trash"
                : `${visibleTrashNotes.length} ${
                    visibleTrashNotes.length === 1
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
            disabled={isLoading || visibleTrashNotes.length === 0}
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
            ) : visibleTrashNotes.length === 0 ? (
              <TrashEmptyState />
            ) : (
              <TrashNotesGrid
                notes={visibleTrashNotes}
                onDelete={handleRequestDelete}
                onRestore={handleRestore}
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
        onConfirm={handleConfirmAction}
        title={confirmTitle}
        variant="danger"
      />
    </>
  );
}
