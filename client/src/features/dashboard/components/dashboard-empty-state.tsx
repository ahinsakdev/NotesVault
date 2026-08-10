import { FileText } from "lucide-react";

type DashboardEmptyStateProps = {
  title: string;
  description: string;
};

export function DashboardEmptyState({
  title,
  description,
}: DashboardEmptyStateProps) {
  return (
    <div className="flex h-64 flex-col items-center justify-center border border-dashed border-border bg-card p-8 text-center">
      <FileText className="size-8 text-muted-foreground" strokeWidth={1.75} />

      <h3 className="mt-5 text-lg font-semibold">{title}</h3>

      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
