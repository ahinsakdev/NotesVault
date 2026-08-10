import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  THEME_COLORS,
  THEME_MEDIA_QUERY,
  THEME_STORAGE_KEY,
  isThemePreference,
} from "@/lib/theme";
import type { ResolvedTheme, ThemePreference } from "@/types/theme.types";

import { ThemeContext } from "./theme-context";

function getStoredTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return isThemePreference(storedTheme) ? storedTheme : "system";
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(THEME_MEDIA_QUERY).matches ? "dark" : "light";
}

function resolveTheme(theme: ThemePreference): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(theme: ResolvedTheme) {
  const rootElement = document.documentElement;

  const themeColorElement = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );

  rootElement.classList.toggle("dark", theme === "dark");
  rootElement.dataset.theme = theme;
  rootElement.style.colorScheme = theme;

  if (themeColorElement) {
    themeColorElement.content = THEME_COLORS[theme];
  }
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<ThemePreference>(() =>
    getStoredTheme(),
  );

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(theme),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(THEME_MEDIA_QUERY);

    function updateResolvedTheme() {
      const nextResolvedTheme = resolveTheme(theme);

      setResolvedTheme(nextResolvedTheme);
      applyTheme(nextResolvedTheme);
    }

    updateResolvedTheme();

    if (theme !== "system") {
      return;
    }

    mediaQuery.addEventListener("change", updateResolvedTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateResolvedTheme);
    };
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemePreference) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
  }, []);

  const contextValue = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [resolvedTheme, setTheme, theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
