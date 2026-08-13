import { useMemo } from "react";

import { useFolders } from "@/features/folders/hooks/use-folders";
import { useNotes } from "@/features/notes/hooks/use-notes";

import type { Folder } from "@/features/folders/types/folder.types";
import type { Note } from "@/features/notes/types/note.types";

import { DashboardErrorState } from "../components/dashboard-error-state";
import { DashboardHeader } from "../components/dashboard-header";
import { DashboardLoadingState } from "../components/dashboard-loading-state";
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

const EMPTY_NOTES: Note[] = [];
const EMPTY_FOLDERS: Folder[] = [];

export function DashboardPage() {
  const notesQuery = useNotes();
  const foldersQuery = useFolders();

  const notes = notesQuery.data ?? EMPTY_NOTES;
  const folders = foldersQuery.data ?? EMPTY_FOLDERS;

  const statistics = useMemo(
    () => createDashboardStatistics(notes, folders),
    [folders, notes],
  );

  const recentNotes = useMemo(() => createRecentDashboardNotes(notes), [notes]);

  const pinnedNotes = useMemo(() => createPinnedDashboardNotes(notes), [notes]);

  const dashboardFolders = useMemo(
    () => createDashboardFolders(folders, notes),
    [folders, notes],
  );

  if (notesQuery.isLoading || foldersQuery.isLoading) {
    return <DashboardLoadingState />;
  }

  if (notesQuery.isError || foldersQuery.isError) {
    return (
      <DashboardErrorState
        isRetrying={notesQuery.isFetching || foldersQuery.isFetching}
        onRetry={() => {
          void Promise.all([
            notesQuery.isError ? notesQuery.refetch() : Promise.resolve(),
            foldersQuery.isError ? foldersQuery.refetch() : Promise.resolve(),
          ]);
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

      <FoldersOverview folders={dashboardFolders} />
    </div>
  );
}
