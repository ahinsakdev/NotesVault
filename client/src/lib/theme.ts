import type { ResolvedTheme, ThemePreference } from "@/types/theme.types";

export const THEME_STORAGE_KEY = "notesvault-theme";

export const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: "#fbfaf8",
  dark: "#07111f",
};

export function isThemePreference(
  value: string | null,
): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}
