import { Check, Laptop, Moon, Sun, type LucideIcon } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import type { ThemePreference } from "@/types/theme.types";
import { cn } from "@/utils/cn";

type ThemeOption = {
  description: string;
  icon: LucideIcon;
  label: string;
  value: ThemePreference;
};

const themeOptions: ThemeOption[] = [
  {
    description: "Bright workspace",
    icon: Sun,
    label: "Light",
    value: "light",
  },
  {
    description: "Low-light workspace",
    icon: Moon,
    label: "Dark",
    value: "dark",
  },
  {
    description: "Follow your device",
    icon: Laptop,
    label: "System",
    value: "system",
  },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      aria-label="Theme preference"
      className="grid gap-2 sm:grid-cols-3"
      role="group"
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = theme === option.value;

        return (
          <button
            aria-pressed={isSelected}
            className={cn(
              "notesvault-focus-ring relative flex min-h-24 flex-col items-start justify-between border px-4 py-3 text-left transition-colors",
              isSelected
                ? "border-primary bg-surface-subtle text-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
            key={option.value}
            onClick={() => setTheme(option.value)}
            type="button"
          >
            <div className="flex w-full items-center justify-between gap-3">
              <Icon
                aria-hidden="true"
                className={cn(
                  "size-4",
                  isSelected ? "text-primary" : "text-muted-foreground",
                )}
              />

              {isSelected ? (
                <span className="flex size-5 items-center justify-center bg-primary text-primary-foreground">
                  <Check aria-hidden="true" className="size-3" />
                </span>
              ) : null}
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold">{option.label}</p>

              <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground">
                {option.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
