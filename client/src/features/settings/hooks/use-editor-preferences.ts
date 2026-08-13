import { useEffect, useState } from "react";

import { getLocalStorageItem, setLocalStorageItem } from "@/utils/browser-storage";

import type { EditorPreferences } from "../types/editor-preferences.types";

const EDITOR_PREFERENCES_STORAGE_KEY = "notesvault-editor-preferences";
const EDITOR_PREFERENCES_CHANGE_EVENT = "notesvault-editor-preferences-change";

const defaultEditorPreferences: EditorPreferences = {
  spellcheck: true,
};

function loadEditorPreferences(): EditorPreferences {
  if (typeof window === "undefined") {
    return defaultEditorPreferences;
  }

  const storedPreferences = getLocalStorageItem(
    EDITOR_PREFERENCES_STORAGE_KEY,
  );

  if (!storedPreferences) {
    return defaultEditorPreferences;
  }

  try {
    const parsedPreferences = JSON.parse(
      storedPreferences,
    ) as Partial<EditorPreferences>;

    return {
      spellcheck:
        typeof parsedPreferences.spellcheck === "boolean"
          ? parsedPreferences.spellcheck
          : defaultEditorPreferences.spellcheck,
    };
  } catch {
    return defaultEditorPreferences;
  }
}

function saveEditorPreferences(preferences: EditorPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  setLocalStorageItem(
    EDITOR_PREFERENCES_STORAGE_KEY,
    JSON.stringify(preferences),
  );

  window.dispatchEvent(new Event(EDITOR_PREFERENCES_CHANGE_EVENT));
}

export function useEditorPreferences() {
  const [preferences, setPreferences] = useState<EditorPreferences>(
    loadEditorPreferences,
  );

  useEffect(() => {
    function handlePreferencesChange() {
      setPreferences(loadEditorPreferences());
    }

    window.addEventListener(
      EDITOR_PREFERENCES_CHANGE_EVENT,
      handlePreferencesChange,
    );

    window.addEventListener("storage", handlePreferencesChange);

    return () => {
      window.removeEventListener(
        EDITOR_PREFERENCES_CHANGE_EVENT,
        handlePreferencesChange,
      );

      window.removeEventListener("storage", handlePreferencesChange);
    };
  }, []);

  function setSpellcheck(spellcheck: boolean) {
    setPreferences((currentPreferences) => {
      const nextPreferences = {
        ...currentPreferences,
        spellcheck,
      };

      saveEditorPreferences(nextPreferences);

      return nextPreferences;
    });
  }

  function resetPreferences() {
    setPreferences(defaultEditorPreferences);
    saveEditorPreferences(defaultEditorPreferences);
  }

  return {
    preferences,
    resetPreferences,
    setSpellcheck,
  };
}
