import { AlertCircle, RotateCcw } from "lucide-react";

type SearchErrorStateProps = {
  onRetry: () => void;
};

export function SearchErrorState({ onRetry }: SearchErrorStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center">
      <div className="flex size-10 items-center justify-center bg-danger-subtle text-danger">
        <AlertCircle aria-hidden="true" className="size-4" strokeWidth={1.8} />
      </div>

      <h2 className="mt-4 text-sm font-semibold text-foreground">
        Search is unavailable
      </h2>

      <p className="mt-1 max-w-sm text-[11px] leading-5 text-muted-foreground">
        We couldn’t load your notes. Try searching again.
      </p>

      <button
        className="notesvault-focus-ring mt-4 inline-flex h-8 items-center gap-1.5 border border-border bg-background px-3 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        onClick={onRetry}
        type="button"
      >
        <RotateCcw aria-hidden="true" className="size-3" />
        Try again
      </button>
    </div>
  );
}
