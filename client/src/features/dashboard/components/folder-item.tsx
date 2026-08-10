import { ArrowRight, FileText, Folder } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "@/app/routes";
import { cn } from "@/utils/cn";

import type { DashboardFolder } from "../types/dashboard.types";
import { getDashboardAccentClass } from "../utils/dashboard.utils";

type FolderItemProps = {
  folder: DashboardFolder;
};

export function FolderItem({ folder }: FolderItemProps) {
  return (
    <Link
      className="group flex items-center gap-3 border border-border bg-card px-4 py-3 transition-[border-color,box-shadow,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] hover:-translate-y-px hover:border-border-strong hover:shadow-card"
      to={ROUTES.folder.replace(":folderId", folder.id)}
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center border border-border bg-surface-subtle">
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-[3px]",
            getDashboardAccentClass(folder.accent),
          )}
        />

        <Folder aria-hidden="true" className="size-4 text-muted-foreground" />
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold tracking-[-0.02em]">
          {folder.name}
        </h3>

        <p className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <FileText aria-hidden="true" className="size-3" />
          {folder.noteCount} notes
        </p>
      </div>

      <ArrowRight
        aria-hidden="true"
        className="size-3.5 shrink-0 text-muted-foreground transition-[color,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] group-hover:translate-x-0.5 group-hover:text-foreground"
      />
    </Link>
  );
}
