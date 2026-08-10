import type { EditorCommandItem as EditorCommandItemType } from "../types/editor-command.types";

type EditorCommandItemProps = {
  command: EditorCommandItemType;
  isAvailable: boolean;
  isSelected: boolean;
  onSelect: () => void;
};

export function EditorCommandItem({
  command,
  isAvailable,
  isSelected,
  onSelect,
}: EditorCommandItemProps) {
  const Icon = command.icon;

  return (
    <button
      aria-disabled={!isAvailable}
      aria-selected={isSelected}
      className="notesvault-command-item"
      disabled={!isAvailable}
      onClick={onSelect}
      role="option"
      type="button"
    >
      <span className="notesvault-command-item-icon">
        <Icon aria-hidden="true" className="size-3.5" />
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-[11px] font-medium text-foreground">
          {command.title}
        </span>

        <span className="mt-0.5 block truncate text-[9px] text-muted-foreground">
          {command.description}
        </span>
      </span>

      {!isAvailable ? (
        <span className="shrink-0 text-[8px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          Unavailable
        </span>
      ) : null}
    </button>
  );
}
