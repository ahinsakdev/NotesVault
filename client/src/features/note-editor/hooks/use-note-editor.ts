import { useCallback, useRef, useState } from "react";
import type { JSONContent } from "@tiptap/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { createNote, updateNote } from "@/features/notes/api/notes.api";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
  const persistedNoteIdRef = useRef<string | null>(note?.id ?? null);

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

    try {
      const persistedNoteId = persistedNoteIdRef.current;

      const savedNote = persistedNoteId
        ? await updateNote(persistedNoteId, valuesToSave)
        : await createNote(valuesToSave);

      if (saveRequestId !== saveRequestIdRef.current) {
        return;
      }

      persistedNoteIdRef.current = savedNote.id;

      queryClient.setQueryData(notesQueryKeys.detail(savedNote.id), savedNote);

      await queryClient.invalidateQueries({
        queryKey: notesQueryKeys.all,
      });

      if (!persistedNoteId) {
        navigate(ROUTES.noteDetails.replace(":noteId", savedNote.id), {
          replace: true,
        });
      }

      if (revisionRef.current !== revisionAtSaveStart) {
        setSaveState("unsaved");
        return;
      }

      setSaveState("saved");
    } catch {
      if (saveRequestId !== saveRequestIdRef.current) {
        return;
      }

      setSaveState("unsaved");

      throw new Error("Unable to save note");
    }
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
