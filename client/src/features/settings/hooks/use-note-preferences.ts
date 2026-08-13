import { useEffect, useState } from "react";

import { getLocalStorageItem, setLocalStorageItem } from "@/utils/browser-storage";

import type { NotePreferences } from "../types/note-preferences.types";

const NOTE_PREFERENCES_STORAGE_KEY = "notesvault-note-preferences";
const NOTE_PREFERENCES_CHANGE_EVENT = "notesvault-note-preferences-change";

const defaultNotePreferences: NotePreferences = {
  defaultFolderId: "",
};

function loadNotePreferences(): NotePreferences {
  if (typeof window === "undefined") {
    return defaultNotePreferences;
  }

  const storedPreferences = getLocalStorageItem(
    NOTE_PREFERENCES_STORAGE_KEY,
  );

  if (!storedPreferences) {
    return defaultNotePreferences;
  }

  try {
    const parsedPreferences = JSON.parse(storedPreferences) as {
      defaultFolderId?: unknown;
    };

    return {
      defaultFolderId:
        typeof parsedPreferences.defaultFolderId === "string"
          ? parsedPreferences.defaultFolderId
          : defaultNotePreferences.defaultFolderId,
    };
  } catch {
    return defaultNotePreferences;
  }
}

function saveNotePreferences(preferences: NotePreferences) {
  if (typeof window === "undefined") {
    return;
  }

  setLocalStorageItem(
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

  function setDefaultFolderId(defaultFolderId: string) {
    const nextPreferences = {
      defaultFolderId,
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
    setDefaultFolderId,
  };
}
