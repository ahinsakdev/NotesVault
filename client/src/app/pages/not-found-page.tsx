import { FileQuestion } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "@/app/routes";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10 text-foreground">
      <section className="w-full max-w-lg rounded-lg border border-border bg-card p-8 text-center shadow-card">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-danger-subtle text-danger">
          <FileQuestion aria-hidden="true" className="size-5" />
        </div>

        <p className="mt-5 text-sm font-medium text-primary">Error 404</p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The page you requested does not exist or may have moved.
        </p>

        <Link
          className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          to={ROUTES.dashboard}
        >
          Return to dashboard
        </Link>
      </section>
    </main>
  );
}
