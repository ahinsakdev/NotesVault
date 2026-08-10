import { useCallback, useRef, useState } from "react";
import type { JSONContent } from "@tiptap/react";

import type { Note } from "@/features/notes/types/note.types";
import { useNotePreferences } from "@/features/settings/hooks/use-note-preferences";

import type {
  NoteEditorSaveState,
  NoteEditorValues,
} from "../types/note-editor.types";
import {
  createEmptyNoteEditorValues,
  createNoteEditorValues,
} from "../utils/note-editor.utils";

type UseNoteEditorOptions = {
  note: Note | null;
  isNewNote: boolean;
};

export function useNoteEditor({ isNewNote, note }: UseNoteEditorOptions) {
  const { preferences: notePreferences } = useNotePreferences();

  const [values, setValues] = useState<NoteEditorValues>(() =>
    note
      ? createNoteEditorValues(note)
      : {
          ...createEmptyNoteEditorValues(),
          folderName: notePreferences.defaultFolder,
        },
  );

  const latestContentRef = useRef<JSONContent>(values.content);

  const revisionRef = useRef(0);
  const saveRequestIdRef = useRef(0);

  const [saveState, setSaveState] = useState<NoteEditorSaveState>("idle");

  function markChanged() {
    revisionRef.current += 1;
    setSaveState("unsaved");
  }

  function updateValues(
    updater: (currentValues: NoteEditorValues) => NoteEditorValues,
  ) {
    setValues((currentValues) => updater(currentValues));
    markChanged();
  }

  function updateField<Key extends keyof NoteEditorValues>(
    field: Key,
    value: NoteEditorValues[Key],
  ) {
    updateValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  const updateContent = useCallback((content: JSONContent) => {
    latestContentRef.current = content;

    revisionRef.current += 1;

    setSaveState((currentSaveState) =>
      currentSaveState === "unsaved" ? currentSaveState : "unsaved",
    );
  }, []);

  async function saveNote() {
    const revisionAtSaveStart = revisionRef.current;
    const saveRequestId = ++saveRequestIdRef.current;

    const valuesToSave: NoteEditorValues = {
      ...values,
      content: latestContentRef.current,
    };

    setSaveState("saving");

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 500);
    });

    // This snapshot becomes the payload for the backend notes API.
    void valuesToSave;

    if (saveRequestId !== saveRequestIdRef.current) {
      return;
    }

    if (revisionRef.current !== revisionAtSaveStart) {
      setSaveState("unsaved");
      return;
    }

    setSaveState("saved");
  }

  return {
    isNewNote,
    saveState,
    values,
    saveNote,
    updateContent,
    updateField,
  };
}
