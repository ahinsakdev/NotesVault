import { useQueryClient } from "@tanstack/react-query";
import { FileQuestion } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/app/routes";
import { DEFAULT_NOTE_FOLDER } from "@/features/folders/constants/folder.constants";
import { useFolders } from "@/features/folders/hooks/use-folders";

import { useAppShell } from "@/components/layout/use-app-shell";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { RouteLoadingFallback } from "@/components/ui/route-loading-fallback";
import { NoteEditorHeader } from "@/features/note-editor/components/note-editor-header";
import { NoteEditorMain } from "@/features/note-editor/components/note-editor-main";
import { NoteEditorMetadata } from "@/features/note-editor/components/note-editor-metadata";
import { useNoteEditor } from "@/features/note-editor/hooks/use-note-editor";
import type { NoteEditorValues } from "@/features/note-editor/types/note-editor.types";
import { createEmptyNoteEditorValues } from "@/features/note-editor/utils/note-editor.utils";
import { useUnsavedNoteWarning } from "@/features/note-editor/hooks/use-unsaved-note-warning";
import { useNotePreferences } from "@/features/settings/hooks/use-note-preferences";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/utils/cn";

import { createNote } from "../api/notes.api";
import { NotesErrorState } from "../components/notes-error-state";
import { useNote } from "../hooks/use-note";
import { notesQueryKeys } from "../hooks/use-notes";
import { useMoveNoteToTrash } from "../hooks/use-move-note-to-trash";
import { useUpdateNoteState } from "../hooks/use-update-note-state";
import type { Note } from "../types/note.types";

type NoteEditorContentProps = {
  initialValues?: NoteEditorValues;
  isNewNote: boolean;
  note: Note | null;
};

function NoteEditorContent({
  initialValues,
  isNewNote,
  note,
}: NoteEditorContentProps) {
  const exportHandlerRef = useRef<(() => void) | null>(null);

  const [isTrashDialogOpen, setIsTrashDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const moveNoteToTrashMutation = useMoveNoteToTrash();
  const updateNoteStateMutation = useUpdateNoteState();

  const { enterFocusMode, exitFocusMode, isFocusMode } = useAppShell();

  useEffect(() => {
    return () => {
      exitFocusMode();
    };
  }, [exitFocusMode]);

  const {
    saveState,
    values,
    saveNote,
    updateContent,
    updateField,
    updateFields,
  } = useNoteEditor({
    initialValues,
    isNewNote,
    note,
  });

  const hasUnsafeChanges =
    saveState === "unsaved" ||
    saveState === "saving" ||
    saveState === "error";

  useUnsavedNoteWarning(hasUnsafeChanges);

  const handleExportReady = useCallback((handler: () => void) => {
    exportHandlerRef.current = handler;
  }, []);

  function handleToggleFocusMode() {
    if (isFocusMode) {
      exitFocusMode();
      return;
    }

    enterFocusMode();
  }

  async function handleDuplicate() {
    if (!note) {
      showToast({
        message: "Save this note before creating a duplicate.",
        title: "Unable to duplicate note",
        variant: "info",
      });
      return;
    }

    if (hasUnsafeChanges) {
      showToast({
        message: "Wait for the current note to finish saving before duplicating it.",
        title: "Save note first",
        variant: "info",
      });
      return;
    }

    try {
      const duplicatedNote = await createNote({
        title: note.title.trim()
          ? `${note.title} (Copy)`
          : "Untitled note (Copy)",
        content: note.content,
        folderId: note.folderId || null,
        folderName: note.folderName,
        tags: [...note.tags],
        isPinned: false,
        isFavorite: false,
        isArchived: false,
      });

      queryClient.setQueryData(
        notesQueryKeys.detail(duplicatedNote.id),
        duplicatedNote,
      );

      await queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      });

      showToast({
        message: "A copy of this note was created successfully.",
        title: "Note duplicated",
        variant: "success",
      });

      navigate(ROUTES.noteDetails.replace(":noteId", duplicatedNote.id));
    } catch {
      showToast({
        message: "The note could not be duplicated. Please try again.",
        title: "Unable to duplicate note",
        variant: "error",
      });
    }
  }

  function handleExport() {
    exportHandlerRef.current?.();
  }

  function handlePrint() {
    window.print();
  }

  function handleNavigateBack() {
    if (hasUnsafeChanges) {
      setIsLeaveDialogOpen(true);
      return;
    }

    navigate(ROUTES.notes);
  }

  function handleConfirmLeave() {
    setIsLeaveDialogOpen(false);
    navigate(ROUTES.notes);
  }

  function handleTrash() {
    if (hasUnsafeChanges) {
      showToast({
        message: "Wait for the current note to finish saving before moving it to Trash.",
        title: "Save note first",
        variant: "info",
      });
      return;
    }

    setIsTrashDialogOpen(true);
  }

  async function handleArchiveChange(value: boolean) {
    if (updateNoteStateMutation.isPending) {
      return;
    }

    if (hasUnsafeChanges) {
      showToast({
        message: "Wait for the current note to finish saving before changing its archive state.",
        title: "Save note first",
        variant: "info",
      });
      return;
    }

    if (!note) {
      updateField("isArchived", value);
      return;
    }

    try {
      await updateNoteStateMutation.mutateAsync({
        noteId: note.id,
        updates: {
          isArchived: value,
        },
      });

      showToast({
        title: value ? "Note archived" : "Note unarchived",
        message: value
          ? "The note was moved to Archived."
          : "The note was returned to your active notes.",
        variant: "success",
      });

      navigate(value ? ROUTES.archived : ROUTES.notes, {
        replace: true,
      });
    } catch {
      showToast({
        title: "Unable to update note",
        message: "The note could not be updated. Please try again.",
        variant: "error",
      });
    }
  }

  async function handleConfirmTrash() {
    if (moveNoteToTrashMutation.isPending) {
      return;
    }

    setIsTrashDialogOpen(false);

    if (!note) {
      navigate(ROUTES.notes, {
        replace: true,
      });

      return;
    }

    try {
      await moveNoteToTrashMutation.mutateAsync(note.id);

      showToast({
        message: "The note was moved to Trash.",
        title: "Note moved to trash",
        variant: "success",
      });

      navigate(ROUTES.notes, {
        replace: true,
      });
    } catch {
      showToast({
        message: "We couldn't move this note to Trash. Try again.",
        title: "Unable to move note",
        variant: "error",
      });
    }
  }

  return (
    <>
      <div
        className={cn(
          "overflow-hidden border border-border bg-card shadow-card",
          isFocusMode
            ? "flex min-h-full flex-col shadow-none"
            : "min-h-[calc(100vh-8rem)]",
        )}
      >
        <NoteEditorHeader
          isArchived={values.isArchived}
          isFavorite={values.isFavorite}
          isFocusMode={isFocusMode}
          isNewNote={isNewNote}
          isPinned={values.isPinned}
          onArchiveChange={(value) => {
            void handleArchiveChange(value);
          }}
          onDuplicate={handleDuplicate}
          onExport={handleExport}
          onFavoriteChange={(value) => updateField("isFavorite", value)}
          onNavigateBack={handleNavigateBack}
          onPinnedChange={(value) => updateField("isPinned", value)}
          onPrint={handlePrint}
          onSave={() => {
            void saveNote();
          }}
          onToggleFocusMode={handleToggleFocusMode}
          onTrash={handleTrash}
          saveState={saveState}
        />

        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col xl:flex-row",
            isFocusMode && "overflow-hidden",
          )}
        >
          <div
            className={cn(
              "min-w-0 flex-1 bg-card",
              isFocusMode && "min-h-0 overflow-y-auto",
            )}
          >
            <NoteEditorMain
              isFocusMode={isFocusMode}
              onContentChange={updateContent}
              onExportReady={handleExportReady}
              onTitleChange={(value) => updateField("title", value)}
              values={values}
            />
          </div>

          {!isFocusMode ? (
            <NoteEditorMetadata
              note={note}
              onFavoriteChange={(value) => updateField("isFavorite", value)}
              onFolderChange={(folderId, folderName) => {
                updateFields({
                  folderId,
                  folderName,
                });
              }}
              onPinnedChange={(value) => updateField("isPinned", value)}
              onTagsChange={(tags) => updateField("tags", tags)}
              onTrash={handleTrash}
              values={values}
            />
          ) : null}
        </div>
      </div>

      <ConfirmDialog
        cancelLabel="Keep editing"
        confirmLabel="Leave"
        description="Your latest changes have not been saved. If you leave now, those changes may be lost."
        isOpen={isLeaveDialogOpen}
        onCancel={() => setIsLeaveDialogOpen(false)}
        onConfirm={handleConfirmLeave}
        title="Leave without saving?"
        variant="danger"
      />

      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Move to trash"
        description="This note will be moved to Trash. You can restore it later."
        isOpen={isTrashDialogOpen}
        onCancel={() => setIsTrashDialogOpen(false)}
        onConfirm={handleConfirmTrash}
        title="Move note to trash?"
        variant="danger"
      />
    </>
  );
}

export function NoteDetailsPage() {
  const { noteId = "new" } = useParams();

  const isNewNote = noteId === "new";

  const {
    data: note,
    isError,
    isLoading,
    refetch,
  } = useNote(isNewNote ? null : noteId);

  const foldersQuery = useFolders();
  const { preferences: notePreferences } = useNotePreferences();

  const shouldResolveDefaultFolder =
    isNewNote && Boolean(notePreferences.defaultFolderId);

  if (
    isLoading ||
    (shouldResolveDefaultFolder && foldersQuery.isLoading)
  ) {
    return <RouteLoadingFallback />;
  }

  if (isError) {
    return (
      <NotesErrorState
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!isNewNote && !note) {
    return (
      <EmptyState
        description="This note could not be found."
        icon={FileQuestion}
        title="Note not found"
      />
    );
  }

  const defaultFolder =
    isNewNote && notePreferences.defaultFolderId
      ? foldersQuery.data?.find(
          (folder) => folder.id === notePreferences.defaultFolderId,
        ) ?? null
      : null;

  const initialValues = isNewNote
    ? {
        ...createEmptyNoteEditorValues(),
        folderId: defaultFolder?.id ?? "",
        folderName: defaultFolder?.name ?? DEFAULT_NOTE_FOLDER,
      }
    : undefined;

  return (
    <NoteEditorContent
      initialValues={initialValues}
      isNewNote={isNewNote}
      note={note ?? null}
    />
  );
}
