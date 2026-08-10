import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";

export function AuthThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDarkTheme = resolvedTheme === "dark";

  function handleThemeChange() {
    setTheme(isDarkTheme ? "light" : "dark");
  }

  return (
    <button
      aria-label={
        isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
      }
      className="notesvault-focus-ring flex size-9 items-center justify-center border border-border bg-card text-muted-foreground shadow-card transition-colors hover:bg-secondary hover:text-foreground"
      onClick={handleThemeChange}
      type="button"
    >
      {isDarkTheme ? (
        <Sun aria-hidden="true" className="size-4" />
      ) : (
        <Moon aria-hidden="true" className="size-4" />
      )}
    </button>
  );
}
