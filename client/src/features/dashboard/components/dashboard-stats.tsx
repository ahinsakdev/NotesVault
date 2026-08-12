import type { DashboardStatistic } from "../types/dashboard.types";
import { DashboardStatCard } from "./dashboard-stat-card";

type DashboardStatsProps = {
  statistics: DashboardStatistic[];
};

export function DashboardStats({
  statistics,
}: DashboardStatsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {statistics.map((statistic) => (
        <DashboardStatCard
          key={statistic.id}
          statistic={statistic}
        />
      ))}
    </section>
  );
}
