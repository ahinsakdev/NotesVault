import { DashboardHeader } from "../components/dashboard-header";
import { DashboardStats } from "../components/dashboard-stats";
import { FoldersOverview } from "../components/folders-overview";
import { PinnedNotesSection } from "../components/pinned-notes-section";
import { RecentNotesSection } from "../components/recent-notes-section";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <DashboardStats />

      <div className="grid items-start gap-6 xl:grid-cols-2">
        <RecentNotesSection />
        <PinnedNotesSection />
      </div>

      <FoldersOverview />
    </div>
  );
}
