import { Palette } from "lucide-react";

import { ThemeSelector } from "@/components/ui/theme-selector";
import { useTheme } from "@/hooks/use-theme";

import { SettingsSection } from "./settings-section";

export function AppearanceSettings() {
  const { resolvedTheme, theme } = useTheme();

  const currentThemeLabel =
    theme === "system"
      ? `System (${resolvedTheme})`
      : theme === "dark"
        ? "Dark"
        : "Light";

  return (
    <SettingsSection
      description="Choose how NotesVault looks across your workspace."
      title="Appearance"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center bg-surface-subtle text-muted-foreground">
          <Palette aria-hidden="true" className="size-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">
                Interface theme
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Select a light or dark appearance, or follow your device.
              </p>
            </div>

            <span className="border border-border bg-surface-subtle px-2 py-1 text-[10px] font-medium text-muted-foreground">
              {currentThemeLabel}
            </span>
          </div>

          <div className="mt-4">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </SettingsSection>
  );
}
