import { Search, X } from "lucide-react";

type NotesSearchProps = {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function NotesSearch({
  disabled = false,
  value,
  onChange,
}: NotesSearchProps) {
  return (
    <div className="relative min-w-0 flex-1 lg:max-w-xl">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
      />

      <input
        aria-label="Search notes"
        className="h-8 w-full border border-input bg-background pl-8 pr-3 text-xs text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary/60 focus:shadow-[inset_0_0_0_1px_var(--primary)]"
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search notes..."
        type="search"
        value={value}
      />

      {value && !disabled ? (
        <button
          aria-label="Clear search"
          className="notesvault-focus-ring absolute right-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          onClick={() => onChange("")}
          type="button"
        >
          <X aria-hidden="true" className="size-3" />
        </button>
      ) : null}
    </div>
  );
}
