import { Maximize2, Minimize2 } from "lucide-react";

type EditorFocusToggleProps = {
  isFocusMode: boolean;
  onToggle: () => void;
};

export function EditorFocusToggle({
  isFocusMode,
  onToggle,
}: EditorFocusToggleProps) {
  return (
    <button
      aria-label={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
      aria-pressed={isFocusMode}
      className="notesvault-focus-ring flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary/70 hover:text-foreground"
      onClick={onToggle}
      title={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
      type="button"
    >
      {isFocusMode ? (
        <Minimize2 aria-hidden="true" className="size-3.5" />
      ) : (
        <Maximize2 aria-hidden="true" className="size-3.5" />
      )}
    </button>
  );
}
