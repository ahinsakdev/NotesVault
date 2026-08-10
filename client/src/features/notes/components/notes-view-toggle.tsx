import { Grid2X2, List } from "lucide-react";

import { cn } from "@/utils/cn";

import type { NotesViewMode } from "../types/note.types";

type NotesViewToggleProps = {
  value: NotesViewMode;
  onChange: (value: NotesViewMode) => void;
};

export function NotesViewToggle({ value, onChange }: NotesViewToggleProps) {
  return (
    <div
      aria-label="Notes view"
      className="flex shrink-0 border border-border bg-background"
      role="group"
    >
      <button
        aria-label="Grid view"
        aria-pressed={value === "grid"}
        className={cn(
          "notesvault-focus-ring flex size-8 items-center justify-center transition-colors",
          value === "grid"
            ? "bg-secondary text-foreground shadow-[inset_0_-2px_0_var(--primary)]"
            : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
        )}
        onClick={() => onChange("grid")}
        title="Grid view"
        type="button"
      >
        <Grid2X2 aria-hidden="true" className="size-3.5" />
      </button>

      <button
        aria-label="List view"
        aria-pressed={value === "list"}
        className={cn(
          "notesvault-focus-ring flex size-8 items-center justify-center border-l border-border transition-colors",
          value === "list"
            ? "bg-secondary text-foreground shadow-[inset_0_-2px_0_var(--primary)]"
            : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
        )}
        onClick={() => onChange("list")}
        title="List view"
        type="button"
      >
        <List aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  );
}
