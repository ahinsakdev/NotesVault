import { RefreshCw, RotateCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

type AppErrorFallbackProps = {
  onReset: () => void;
};

export function AppErrorFallback({ onReset }: AppErrorFallbackProps) {
  function handleReload(): void {
    window.location.reload();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10 text-foreground">
      <section
        aria-live="assertive"
        className="w-full max-w-lg border border-danger/30 bg-card p-8 text-center shadow-card"
        role="alert"
      >
        <div className="mx-auto flex size-12 items-center justify-center bg-danger-subtle text-danger">
          <TriangleAlert aria-hidden="true" className="size-5" />
        </div>

        <p className="mt-5 text-sm font-medium text-danger">
          Application error
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          NotesVault ran into an unexpected problem. You can try again or
          reload the page if the problem continues.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            leftIcon={<RefreshCw className="size-3.5" />}
            onClick={onReset}
            variant="outline"
          >
            Try again
          </Button>

          <Button
            leftIcon={<RotateCcw className="size-3.5" />}
            onClick={handleReload}
          >
            Reload page
          </Button>
        </div>
      </section>
    </main>
  );
}
