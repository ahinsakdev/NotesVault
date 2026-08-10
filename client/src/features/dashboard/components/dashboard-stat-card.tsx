import { cn } from "@/utils/cn";

import type { DashboardStatistic } from "../types/dashboard.types";
import { getDashboardStatisticAccentClasses } from "../utils/dashboard.utils";

type DashboardStatCardProps = {
  statistic: DashboardStatistic;
};

export function DashboardStatCard({ statistic }: DashboardStatCardProps) {
  const Icon = statistic.icon;

  const accentClasses = getDashboardStatisticAccentClasses(statistic.accent);

  return (
    <article className="flex items-center gap-4 border border-border bg-card px-4 py-4 transition-[border-color,box-shadow] duration-[var(--motion-standard)] hover:border-border-strong hover:shadow-card">
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center",
          accentClasses.iconBackground,
          accentClasses.iconColor,
        )}
      >
        <Icon aria-hidden="true" className="size-4.5" strokeWidth={1.8} />
      </span>

      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground">
          {statistic.title}
        </p>

        <p className="mt-0.5 text-2xl font-semibold leading-none tracking-[-0.04em]">
          {statistic.value}
        </p>

        <p
          className={cn(
            "mt-1.5 text-[10px] font-medium",
            accentClasses.descriptionColor,
          )}
        >
          {statistic.description}
        </p>
      </div>
    </article>
  );
}
