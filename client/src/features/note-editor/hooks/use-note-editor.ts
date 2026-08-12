import { useCallback, useEffect, useRef, useState } from "react";
import type { JSONContent } from "@tiptap/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { createNote, updateNote } from "@/features/notes/api/notes.api";
import { notesQueryKeys } from "@/features/notes/hooks/use-notes";
import type { Note } from "@/features/notes/types/note.types";

import type {
  NoteEditorSaveState,
  NoteEditorValues,
} from "../types/note-editor.types";
import {
  createEmptyNoteEditorValues,
  createNoteEditorValues,
} from "../utils/note-editor.utils";

type UseNoteEditorOptions = {
  initialValues?: NoteEditorValues;
  note: Note | null;
  isNewNote: boolean;
};

const AUTOSAVE_DELAY_MS = 1_500;

export function useNoteEditor({
  initialValues,
  isNewNote,
  note,
}: UseNoteEditorOptions) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [values, setValues] = useState<NoteEditorValues>(() =>
    note
      ? createNoteEditorValues(note)
      : initialValues ?? createEmptyNoteEditorValues(),
  );

  const [saveState, setSaveState] = useState<NoteEditorSaveState>("idle");

  const valuesRef = useRef(values);
  const saveStateRef = useRef<NoteEditorSaveState>("idle");
  const revisionRef = useRef(0);
  const saveRequestIdRef = useRef(0);
  const persistedNoteIdRef = useRef<string | null>(note?.id ?? null);
  const saveInProgressRef = useRef(false);
  const saveQueuedRef = useRef(false);

  const updateSaveState = useCallback((state: NoteEditorSaveState) => {
    saveStateRef.current = state;
    setSaveState(state);
  }, []);

  const markChanged = useCallback(() => {
    revisionRef.current += 1;
    updateSaveState("unsaved");
  }, [updateSaveState]);

  const updateValues = useCallback(
    (updater: (currentValues: NoteEditorValues) => NoteEditorValues) => {
      setValues((currentValues) => {
        const nextValues = updater(currentValues);

        valuesRef.current = nextValues;

        return nextValues;
      });

      markChanged();
    },
    [markChanged],
  );

  const updateField = useCallback(
    <Key extends keyof NoteEditorValues>(
      field: Key,
      value: NoteEditorValues[Key],
    ) => {
      updateValues((currentValues) => ({
        ...currentValues,
        [field]: value,
      }));
    },
    [updateValues],
  );

  const updateFields = useCallback(
    (updates: Partial<NoteEditorValues>) => {
      updateValues((currentValues) => ({
        ...currentValues,
        ...updates,
      }));
    },
    [updateValues],
  );

  const updateContent = useCallback(
    (content: JSONContent) => {
      updateValues((currentValues) => ({
        ...currentValues,
        content,
      }));
    },
    [updateValues],
  );

  const saveNote = useCallback(async () => {
      if (saveInProgressRef.current) {
        saveQueuedRef.current = true;
        return;
      }

      if (
        saveStateRef.current !== "unsaved" &&
        saveStateRef.current !== "error" &&
        persistedNoteIdRef.current !== null
      ) {
        return;
      }

      saveInProgressRef.current = true;
      saveQueuedRef.current = false;

      const revisionAtSaveStart = revisionRef.current;
      const saveRequestId = ++saveRequestIdRef.current;
      const valuesToSave = valuesRef.current;

      updateSaveState("saving");

      try {
        const persistedNoteId = persistedNoteIdRef.current;

        const noteInput = {
          ...valuesToSave,
          folderId: valuesToSave.folderId || null,
        };

        const savedNote = persistedNoteId
          ? await updateNote(persistedNoteId, noteInput)
          : await createNote(noteInput);

        if (saveRequestId !== saveRequestIdRef.current) {
          return;
        }

        persistedNoteIdRef.current = savedNote.id;

        queryClient.setQueryData(
          notesQueryKeys.detail(savedNote.id),
          savedNote,
        );

        await queryClient.invalidateQueries({
          queryKey: notesQueryKeys.all,
        });

        if (!persistedNoteId) {
          navigate(ROUTES.noteDetails.replace(":noteId", savedNote.id), {
            replace: true,
          });
        }

        if (revisionRef.current !== revisionAtSaveStart) {
          updateSaveState("unsaved");
          return;
        }

        updateSaveState("saved");
      } catch {
        if (saveRequestId === saveRequestIdRef.current) {
          updateSaveState("error");
        }

        throw new Error("Unable to save note");
      } finally {
        saveInProgressRef.current = false;

        if (saveQueuedRef.current) {
          saveQueuedRef.current = false;
          updateSaveState("unsaved");
        }
      }
    }, [navigate, queryClient, updateSaveState]);

  useEffect(() => {
    if (saveState !== "unsaved") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void saveNote().catch(() => undefined);
    }, AUTOSAVE_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [saveNote, saveState, values]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isSaveShortcut =
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        event.key.toLowerCase() === "s";

      if (!isSaveShortcut) {
        return;
      }

      event.preventDefault();

      void saveNote().catch(() => undefined);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [saveNote]);

  return {
    isNewNote,
    saveState,
    values,
    saveNote,
    updateContent,
    updateField,
    updateFields,
  };
}
