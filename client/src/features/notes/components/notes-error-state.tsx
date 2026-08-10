import { RefreshCw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

type NotesErrorStateProps = {
  onRetry: () => void;
};

export function NotesErrorState({ onRetry }: NotesErrorStateProps) {
  return (
    <section
      aria-live="polite"
      className="flex min-h-72 flex-col items-center justify-center border border-danger/30 bg-danger/5 px-6 py-10 text-center"
    >
      <TriangleAlert
        aria-hidden="true"
        className="size-8 text-danger"
        strokeWidth={1.6}
      />

      <h2 className="mt-4 text-base font-semibold">Unable to load notes</h2>

      <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
        Something went wrong while loading your notes. Try the request again.
      </p>

      <Button
        className="mt-5"
        leftIcon={<RefreshCw className="size-3.5" />}
        onClick={onRetry}
        size="sm"
        variant="outline"
      >
        Try again
      </Button>
    </section>
  );
}
