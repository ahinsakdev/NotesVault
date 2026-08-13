import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router";

type DashboardEmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
};

export function DashboardEmptyState({
  title,
  description,
  actionLabel,
  actionTo,
}: DashboardEmptyStateProps) {

  return (
    <div className="flex h-64 flex-col items-center justify-center border border-dashed border-border bg-card p-8 text-center">
      <FileText
        aria-hidden="true"
        className="size-8 text-muted-foreground"
        strokeWidth={1.75}
      />

      <h3 className="mt-5 text-lg font-semibold">{title}</h3>

      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>

      {actionLabel && actionTo ? (
        <Link
          className="mt-5 inline-flex min-h-8 items-center justify-center gap-2 bg-secondary px-3 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          to={actionTo}
        >
          {actionLabel}

          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
