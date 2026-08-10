import { useEffect, useState } from "react";

import {
  DEFAULT_NOTE_FOLDER,
  NOTE_FOLDER_OPTIONS,
  type NoteFolderOption,
} from "@/features/folders/constants/folder.constants";

import type { NotePreferences } from "../types/note-preferences.types";

const NOTE_PREFERENCES_STORAGE_KEY = "notesvault-note-preferences";
const NOTE_PREFERENCES_CHANGE_EVENT = "notesvault-note-preferences-change";

const defaultNotePreferences: NotePreferences = {
  defaultFolder: DEFAULT_NOTE_FOLDER,
};

function isNoteFolderOption(value: unknown): value is NoteFolderOption {
  return NOTE_FOLDER_OPTIONS.includes(value as NoteFolderOption);
}

function loadNotePreferences(): NotePreferences {
  if (typeof window === "undefined") {
    return defaultNotePreferences;
  }

  const storedPreferences = window.localStorage.getItem(
    NOTE_PREFERENCES_STORAGE_KEY,
  );

  if (!storedPreferences) {
    return defaultNotePreferences;
  }

  try {
    const parsedPreferences = JSON.parse(
      storedPreferences,
    ) as Partial<NotePreferences>;

    return {
      defaultFolder: isNoteFolderOption(parsedPreferences.defaultFolder)
        ? parsedPreferences.defaultFolder
        : defaultNotePreferences.defaultFolder,
    };
  } catch {
    return defaultNotePreferences;
  }
}

function saveNotePreferences(preferences: NotePreferences) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    NOTE_PREFERENCES_STORAGE_KEY,
    JSON.stringify(preferences),
  );

  window.dispatchEvent(new Event(NOTE_PREFERENCES_CHANGE_EVENT));
}

export function useNotePreferences() {
  const [preferences, setPreferences] =
    useState<NotePreferences>(loadNotePreferences);

  useEffect(() => {
    function handlePreferencesChange() {
      setPreferences(loadNotePreferences());
    }

    window.addEventListener(
      NOTE_PREFERENCES_CHANGE_EVENT,
      handlePreferencesChange,
    );

    window.addEventListener("storage", handlePreferencesChange);

    return () => {
      window.removeEventListener(
        NOTE_PREFERENCES_CHANGE_EVENT,
        handlePreferencesChange,
      );

      window.removeEventListener("storage", handlePreferencesChange);
    };
  }, []);

  function setDefaultFolder(defaultFolder: NoteFolderOption) {
    const nextPreferences = {
      defaultFolder,
    };

    setPreferences(nextPreferences);
    saveNotePreferences(nextPreferences);
  }

  function resetPreferences() {
    setPreferences(defaultNotePreferences);
    saveNotePreferences(defaultNotePreferences);
  }

  return {
    preferences,
    resetPreferences,
    setDefaultFolder,
  };
}
