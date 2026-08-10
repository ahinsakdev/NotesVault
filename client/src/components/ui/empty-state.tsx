import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type EmptyStateProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  actions?: ReactNode;
  className?: string;
};

export function EmptyState({
  actions,
  className,
  description,
  icon: Icon,
  title,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "flex min-h-72 flex-col items-center justify-center border border-dashed border-border bg-card px-6 py-10 text-center",
        className,
      )}
    >
      <div className="flex size-10 items-center justify-center bg-surface-subtle text-muted-foreground">
        <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
      </div>

      <h2 className="mt-4 text-sm font-semibold text-foreground">{title}</h2>

      <p className="mt-1 max-w-sm text-[11px] leading-5 text-muted-foreground">
        {description}
      </p>

      {actions ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {actions}
        </div>
      ) : null}
    </section>
  );
}
