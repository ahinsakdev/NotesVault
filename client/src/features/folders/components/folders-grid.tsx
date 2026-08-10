import type { FolderSummary } from "../types/folder.types";
import { FolderCard } from "./folder-card";

type FoldersGridProps = {
  folders: FolderSummary[];
};

export function FoldersGrid({ folders }: FoldersGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {folders.map((folder) => (
        <FolderCard folder={folder} key={folder.id} />
      ))}
    </div>
  );
}
