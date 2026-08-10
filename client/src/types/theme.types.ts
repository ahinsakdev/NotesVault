export type ThemePreference = "light" | "dark" | "system";

export type ResolvedTheme = Exclude<ThemePreference, "system">;

export type ThemeContextValue = {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
};
