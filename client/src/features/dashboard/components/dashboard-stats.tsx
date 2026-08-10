import { dashboardStatistics } from "../data/dashboard.mock-data";
import { DashboardStatCard } from "./dashboard-stat-card";

export function DashboardStats() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStatistics.map((statistic) => (
        <DashboardStatCard key={statistic.id} statistic={statistic} />
      ))}
    </section>
  );
}
