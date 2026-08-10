import { cn } from "@/utils/cn";

import type { SlashCommandItem as SlashCommandItemType } from "../types/slash-command.types";

type SlashCommandItemProps = {
  command: SlashCommandItemType;
  isSelected: boolean;
  onSelect: () => void;
};

export function SlashCommandItem({
  command,
  isSelected,
  onSelect,
}: SlashCommandItemProps) {
  const Icon = command.icon;

  return (
    <button
      className={cn(
        "flex w-full items-start gap-3 px-3 py-2 text-left transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
        isSelected
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
      )}
      onClick={onSelect}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      role="option"
      type="button"
    >
      <span className="flex size-8 shrink-0 items-center justify-center border border-border bg-background">
        <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-foreground">
          {command.title}
        </span>

        <span className="mt-0.5 block text-[10px] leading-4 text-muted-foreground">
          {command.description}
        </span>
      </span>
    </button>
  );
}
