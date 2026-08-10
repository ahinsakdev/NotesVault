import { Search } from "lucide-react";

type GlobalSearchTriggerProps = {
  onClick: () => void;
};

export function GlobalSearchTrigger({ onClick }: GlobalSearchTriggerProps) {
  return (
    <>
      <button
        aria-label="Open global search"
        className="group relative hidden h-8 w-full max-w-sm items-center border border-border bg-background px-3 text-left text-xs text-foreground shadow-sm transition-[border-color,background-color,box-shadow] duration-[var(--motion-standard)] hover:border-primary/25 hover:bg-surface-elevated focus-visible:border-primary/60 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--primary)] sm:flex"
        onClick={onClick}
        type="button"
      >
        <Search
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
          strokeWidth={1.8}
        />

        <span className="ml-2.5 text-muted-foreground">Search notes...</span>

        <kbd className="ml-auto border border-border bg-surface-subtle px-1.5 py-0.5 text-[9px] leading-none text-muted-foreground">
          ⌘ K
        </kbd>
      </button>

      <button
        aria-label="Open global search"
        className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
        onClick={onClick}
        title="Search notes"
        type="button"
      >
        <Search aria-hidden="true" className="size-4" strokeWidth={1.8} />
      </button>
    </>
  );
}
