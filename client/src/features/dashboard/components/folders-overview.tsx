import { ROUTES } from "@/app/routes";

import type { DashboardFolder } from "../types/dashboard.types";
import { DashboardEmptyState } from "./dashboard-empty-state";
import { DashboardSectionHeader } from "./dashboard-section-header";
import { FolderItem } from "./folder-item";

type FoldersOverviewProps = {
  folders: DashboardFolder[];
};

export function FoldersOverview({
  folders,
}: FoldersOverviewProps) {
  return (
    <section>
      <DashboardSectionHeader
        description="Your most active note collections."
        linkLabel="View folders"
        linkTo={ROUTES.folders}
        title="Folders overview"
      />

      {folders.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {folders.map((folder) => (
            <FolderItem folder={folder} key={folder.id} />
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          description="Folders you create will appear here."
          title="No folders yet"
        />
      )}
    </section>
  );
}
