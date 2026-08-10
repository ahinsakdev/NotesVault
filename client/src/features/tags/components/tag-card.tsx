import { ArrowRight, FileText, Tag } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "@/app/routes";
import { formatNoteDate } from "@/features/notes/utils/note.utils";

import type { TagSummary } from "../types/tag.types";

type TagCardProps = {
  tag: TagSummary;
};

export function TagCard({ tag }: TagCardProps) {
  return (
    <Link
      className="group flex min-h-32 flex-col justify-between border border-border bg-card p-4 transition-[border-color,box-shadow,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] hover:-translate-y-px hover:border-border-strong hover:shadow-card"
      to={ROUTES.tag.replace(":tagId", encodeURIComponent(tag.id))}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-9 shrink-0 items-center justify-center border border-border bg-surface-subtle text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] group-hover:text-foreground">
          <Tag aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </span>

        <ArrowRight
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground transition-[color,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] group-hover:translate-x-0.5 group-hover:text-foreground"
        />
      </div>

      <div className="mt-5">
        <h2 className="truncate text-sm font-semibold tracking-[-0.02em] text-foreground">
          {tag.name}
        </h2>

        <div className="mt-1.5 flex items-center justify-between gap-3 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <FileText aria-hidden="true" className="size-3" />
            {tag.noteCount} {tag.noteCount === 1 ? "note" : "notes"}
          </span>

          <span className="truncate">
            Updated {formatNoteDate(tag.updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
