import { AlertCircle, Check, Cloud, LoaderCircle } from "lucide-react";

import type { NoteEditorSaveState } from "../types/note-editor.types";

type NoteEditorSaveStatusProps = {
  state: NoteEditorSaveState;
};

export function NoteEditorSaveStatus({ state }: NoteEditorSaveStatusProps) {
  if (state === "saving") {
    return (
      <span
        aria-live="polite"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
        role="status"
      >
        <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />
        Saving
      </span>
    );
  }

  if (state === "saved") {
    return (
      <span
        aria-live="polite"
        className="inline-flex items-center gap-1.5 text-xs text-success"
        role="status"
      >
        <Check aria-hidden="true" className="size-3.5" />
        Saved
      </span>
    );
  }

  if (state === "unsaved") {
    return (
      <span
        aria-live="polite"
        className="inline-flex items-center gap-1.5 text-xs text-warning"
        role="status"
      >
        <Cloud aria-hidden="true" className="size-3.5" />
        Unsaved changes
      </span>
    );
  }

  if (state === "error") {
    return (
      <span
        aria-live="assertive"
        className="inline-flex items-center gap-1.5 text-xs text-danger"
        role="status"
      >
        <AlertCircle aria-hidden="true" className="size-3.5" />
        Save failed
      </span>
    );
  }

  return <span className="text-xs text-muted-foreground">Ready</span>;
}
