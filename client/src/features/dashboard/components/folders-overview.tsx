import { ROUTES } from "@/app/routes";

import { folders } from "../data/dashboard.mock-data";
import { DashboardEmptyState } from "./dashboard-empty-state";
import { DashboardSectionHeader } from "./dashboard-section-header";
import { FolderItem } from "./folder-item";

export function FoldersOverview() {
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
