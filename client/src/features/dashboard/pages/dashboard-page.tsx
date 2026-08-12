import { useMemo } from "react";

import { RouteLoadingFallback } from "@/components/ui/route-loading-fallback";
import { NotesErrorState } from "@/features/notes/components/notes-error-state";
import { useNotes } from "@/features/notes/hooks/use-notes";

import { DashboardHeader } from "../components/dashboard-header";
import { DashboardStats } from "../components/dashboard-stats";
import { FoldersOverview } from "../components/folders-overview";
import { PinnedNotesSection } from "../components/pinned-notes-section";
import { RecentNotesSection } from "../components/recent-notes-section";
import {
  createDashboardFolders,
  createDashboardStatistics,
  createPinnedDashboardNotes,
  createRecentDashboardNotes,
} from "../utils/dashboard-data.utils";

export function DashboardPage() {
  const {
    data: notes = [],
    isError,
    isLoading,
    refetch,
  } = useNotes();

  const statistics = useMemo(
    () => createDashboardStatistics(notes),
    [notes],
  );

  const recentNotes = useMemo(
    () => createRecentDashboardNotes(notes),
    [notes],
  );

  const pinnedNotes = useMemo(
    () => createPinnedDashboardNotes(notes),
    [notes],
  );

  const folders = useMemo(
    () => createDashboardFolders(notes),
    [notes],
  );

  if (isLoading) {
    return <RouteLoadingFallback />;
  }

  if (isError) {
    return (
      <NotesErrorState
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <DashboardStats statistics={statistics} />

      <div className="grid items-start gap-6 xl:grid-cols-2">
        <RecentNotesSection notes={recentNotes} />
        <PinnedNotesSection notes={pinnedNotes} />
      </div>

      <FoldersOverview folders={folders} />
    </div>
  );
}
