import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";

import { useAppShell } from "@/components/layout/use-app-shell";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { NoteEditorHeader } from "@/features/note-editor/components/note-editor-header";
import { NoteEditorMain } from "@/features/note-editor/components/note-editor-main";
import { NoteEditorMetadata } from "@/features/note-editor/components/note-editor-metadata";
import { useNoteEditor } from "@/features/note-editor/hooks/use-note-editor";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/utils/cn";

import { notesMockData } from "../data/notes.mock-data";
import type { Note } from "../types/note.types";

type NoteEditorContentProps = {
  isNewNote: boolean;
  note: Note | null;
};

function NoteEditorContent({ isNewNote, note }: NoteEditorContentProps) {
    const exportHandlerRef = useRef<(() => void) | null>(null);

    const [isTrashDialogOpen, setIsTrashDialogOpen] = useState(false);

    const { showToast } = useToast();

    const { enterFocusMode, exitFocusMode, isFocusMode } = useAppShell();

    useEffect(() => {
      return () => {
        exitFocusMode();
      };
    }, [exitFocusMode]);

    const { saveState, values, saveNote, updateContent, updateField } =
      useNoteEditor({
        isNewNote,
        note,
      });

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

  function handleDuplicate() {
    showToast({
      message: "Duplicate note is not available yet.",
      title: "Duplicate note",
      variant: "info",
    });
  }

  function handleExport() {
    exportHandlerRef.current?.();
  }

  function handlePrint() {
    window.print();
  }

  function handleTrash() {
    setIsTrashDialogOpen(true);
  }

  function handleConfirmTrash() {
    setIsTrashDialogOpen(false);

    showToast({
      message: "Move to Trash is not available yet.",
      title: "Move to trash",
      variant: "info",
    });
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
          isFavorite={values.isFavorite}
          isFocusMode={isFocusMode}
          isNewNote={isNewNote}
          isPinned={values.isPinned}
          onDuplicate={handleDuplicate}
          onExport={handleExport}
          onFavoriteChange={(value) => updateField("isFavorite", value)}
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
              onFolderChange={(value) => updateField("folderName", value)}
              onPinnedChange={(value) => updateField("isPinned", value)}
              values={values}
            />
          ) : null}
        </div>
      </div>

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

  const note = useMemo(
    () =>
      isNewNote
        ? null
        : (notesMockData.find((currentNote) => currentNote.id === noteId) ??
          null),
    [isNewNote, noteId],
  );

  return <NoteEditorContent isNewNote={isNewNote} note={note} />;
}
