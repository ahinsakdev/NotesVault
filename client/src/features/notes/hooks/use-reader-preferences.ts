import { useState } from "react";

import type {
  ReaderFontFamily,
  ReaderFontSize,
  ReaderLineHeight,
  ReaderPreferences,
  ReaderWidth,
} from "../types/reader-preferences.types";

const READER_PREFERENCES_STORAGE_KEY = "notesvault-reader-preferences";

const defaultReaderPreferences: ReaderPreferences = {
  fontFamily: "serif",
  fontSize: "default",
  lineHeight: "normal",
  width: "comfortable",
};

function isReaderFontFamily(value: unknown): value is ReaderFontFamily {
  return value === "serif" || value === "sans";
}

function isReaderFontSize(value: unknown): value is ReaderFontSize {
  return value === "small" || value === "default" || value === "large";
}

function isReaderLineHeight(value: unknown): value is ReaderLineHeight {
  return value === "compact" || value === "normal" || value === "relaxed";
}

function isReaderWidth(value: unknown): value is ReaderWidth {
  return value === "compact" || value === "comfortable" || value === "wide";
}

function loadReaderPreferences(): ReaderPreferences {
  if (typeof window === "undefined") {
    return defaultReaderPreferences;
  }

  const storedPreferences = window.localStorage.getItem(
    READER_PREFERENCES_STORAGE_KEY,
  );

  if (!storedPreferences) {
    return defaultReaderPreferences;
  }

  try {
    const parsedPreferences = JSON.parse(
      storedPreferences,
    ) as Partial<ReaderPreferences>;

    return {
      fontFamily: isReaderFontFamily(parsedPreferences.fontFamily)
        ? parsedPreferences.fontFamily
        : defaultReaderPreferences.fontFamily,
      fontSize: isReaderFontSize(parsedPreferences.fontSize)
        ? parsedPreferences.fontSize
        : defaultReaderPreferences.fontSize,
      lineHeight: isReaderLineHeight(parsedPreferences.lineHeight)
        ? parsedPreferences.lineHeight
        : defaultReaderPreferences.lineHeight,
      width: isReaderWidth(parsedPreferences.width)
        ? parsedPreferences.width
        : defaultReaderPreferences.width,
    };
  } catch {
    return defaultReaderPreferences;
  }
}

function saveReaderPreferences(preferences: ReaderPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    READER_PREFERENCES_STORAGE_KEY,
    JSON.stringify(preferences),
  );
}

export function useReaderPreferences() {
  const [preferences, setPreferences] = useState<ReaderPreferences>(
    loadReaderPreferences,
  );

  function updatePreferences(
    updater: (currentPreferences: ReaderPreferences) => ReaderPreferences,
  ) {
    setPreferences((currentPreferences) => {
      const nextPreferences = updater(currentPreferences);

      saveReaderPreferences(nextPreferences);

      return nextPreferences;
    });
  }

  function setFontFamily(value: ReaderFontFamily) {
    updatePreferences((currentPreferences) => ({
      ...currentPreferences,
      fontFamily: value,
    }));
  }

  function setFontSize(value: ReaderFontSize) {
    updatePreferences((currentPreferences) => ({
      ...currentPreferences,
      fontSize: value,
    }));
  }

  function setLineHeight(value: ReaderLineHeight) {
    updatePreferences((currentPreferences) => ({
      ...currentPreferences,
      lineHeight: value,
    }));
  }

  function setWidth(value: ReaderWidth) {
    updatePreferences((currentPreferences) => ({
      ...currentPreferences,
      width: value,
    }));
  }

  function resetPreferences() {
    setPreferences(defaultReaderPreferences);
    saveReaderPreferences(defaultReaderPreferences);
  }

  return {
    preferences,
    resetPreferences,
    setFontFamily,
    setFontSize,
    setLineHeight,
    setWidth,
  };
}
