import { ArrowLeft, FileText, Save, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { NoteEditorSaveState } from "../types/note-editor.types";
import { EditorFocusToggle } from "./editor-focus-toggle";
import { NoteActionsMenu } from "./note-actions-menu";
import { NoteEditorSaveStatus } from "./note-editor-save-status";

type NoteEditorHeaderProps = {
  isArchived: boolean;
  isFavorite: boolean;
  isFocusMode: boolean;
  isNewNote: boolean;
  isPinned: boolean;
  saveState: NoteEditorSaveState;
  onArchiveChange: (value: boolean) => void;
  onDuplicate: () => void;
  onExport: () => void;
  onFavoriteChange: (value: boolean) => void;
  onNavigateBack: () => void;
  onPinnedChange: (value: boolean) => void;
  onPrint: () => void;
  onSave: () => void;
  onToggleFocusMode: () => void;
  onTrash: () => void;
};

export function NoteEditorHeader({
  isArchived,
  isFavorite,
  isFocusMode,
  isNewNote,
  isPinned,
  onArchiveChange,
  onDuplicate,
  onExport,
  onFavoriteChange,
  onNavigateBack,
  onPinnedChange,
  onPrint,
  onSave,
  onToggleFocusMode,
  onTrash,
  saveState,
}: NoteEditorHeaderProps) {
  return (
    <header className="relative flex min-h-14 shrink-0 items-center gap-2 border-b border-border bg-surface px-3 py-2.5 sm:min-h-16 sm:gap-3 sm:px-5 sm:py-3">
      <button
        aria-label="Back to all notes"
        className="notesvault-focus-ring flex size-8 shrink-0 items-center justify-center border border-transparent text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:border-border hover:bg-secondary hover:text-foreground sm:size-9"
        onClick={onNavigateBack}
        title="Back to all notes"
        type="button"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
      </button>

      <div className="hidden size-9 shrink-0 items-center justify-center border border-border bg-surface-subtle text-primary sm:flex">
        <FileText aria-hidden="true" className="size-4" strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-xs font-semibold tracking-[-0.01em] text-foreground">
            {isNewNote ? "New note" : "Editing note"}
          </p>

          <span
            aria-hidden="true"
            className="hidden size-1 shrink-0 rounded-full bg-border-strong sm:block"
          />

          <span className="hidden truncate text-[10px] text-muted-foreground sm:inline">
            NotesVault document
          </span>
        </div>

        <div className="mt-0.5 sm:mt-1">
          <NoteEditorSaveStatus state={saveState} />
        </div>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
        <Button
          className="px-2.5 sm:px-3"
          leftIcon={<Save className="size-3.5" />}
          onClick={onSave}
          size="sm"
        >
          <span className="hidden sm:inline">Save</span>
        </Button>

        <EditorFocusToggle
          isFocusMode={isFocusMode}
          onToggle={onToggleFocusMode}
        />

        <button
          aria-label="Share note"
          className="notesvault-focus-ring hidden size-8 items-center justify-center border border-border text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground sm:flex"
          title="Share note"
          type="button"
        >
          <Share2 aria-hidden="true" className="size-3.5" />
        </button>

        <NoteActionsMenu
          isArchived={isArchived}
          isFavorite={isFavorite}
          isPinned={isPinned}
          onArchiveChange={onArchiveChange}
          onDuplicate={onDuplicate}
          onExport={onExport}
          onFavoriteChange={onFavoriteChange}
          onPinnedChange={onPinnedChange}
          onPrint={onPrint}
          onTrash={onTrash}
        />
      </div>
    </header>
  );
}
