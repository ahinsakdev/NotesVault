import { Clock3, Edit3, FileText, Folder, Tag } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "@/app/routes";
import { formatNoteDate } from "@/features/notes/utils/note.utils";
import { cn } from "@/utils/cn";

import type { GlobalSearchResult } from "../types/global-search.types";

type GlobalSearchResultItemProps = {
  index: number;
  isSelected: boolean;
  result: GlobalSearchResult;
  onOpen: () => void;
  onSelect: (index: number) => void;
};

const matchFieldLabels = {
  title: "Title",
  preview: "Content",
  folder: "Folder",
  tag: "Tag",
} as const;

export function GlobalSearchResultItem({
  index,
  isSelected,
  onOpen,
  onSelect,
  result,
}: GlobalSearchResultItemProps) {
  const { note } = result;

  const editRoute = ROUTES.noteDetails.replace(":noteId", note.id);

  return (
    <div
      aria-selected={isSelected}
      className={cn(
        "group/result relative flex min-w-0 items-start gap-3 px-4 py-3 transition-colors",
        isSelected
          ? "bg-secondary text-foreground"
          : "text-foreground hover:bg-surface-subtle",
      )}
      onMouseEnter={() => onSelect(index)}
      role="option"
    >
      <button
        aria-label={`Read ${note.title}`}
        className="absolute inset-0 z-0 cursor-pointer outline-none"
        onClick={onOpen}
        type="button"
      />

      <div
        className={cn(
          "pointer-events-none relative z-10 mt-0.5 flex size-8 shrink-0 items-center justify-center bg-surface-subtle text-muted-foreground transition-colors",
          isSelected && "bg-background text-primary",
        )}
      >
        <FileText aria-hidden="true" className="size-3.5" />
      </div>

      <div className="pointer-events-none relative z-10 min-w-0 flex-1">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <h3 className="truncate text-xs font-semibold tracking-[-0.01em]">
            {note.title}
          </h3>

          <span className="shrink-0 text-[9px] text-muted-foreground">
            {formatNoteDate(note.updatedAt)}
          </span>
        </div>

        <p className="mt-1 line-clamp-1 text-[10px] leading-4 text-muted-foreground">
          {note.preview}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-muted-foreground">
          <span className="inline-flex min-w-0 items-center gap-1">
            <Folder aria-hidden="true" className="size-2.5 shrink-0" />

            <span className="truncate">{note.folderName}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-primary">
            {result.matchedField === "tag" ? (
              <Tag aria-hidden="true" className="size-2.5" />
            ) : (
              <Clock3 aria-hidden="true" className="size-2.5" />
            )}
            Matched {matchFieldLabels[result.matchedField].toLowerCase()}
          </span>
        </div>
      </div>

      <Link
        aria-label={`Edit ${note.title}`}
        className={cn(
          "relative z-20 mt-0.5 flex size-7 shrink-0 items-center justify-center bg-background text-muted-foreground opacity-0 transition-[opacity,background-color,color,transform] hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isSelected && "opacity-100",
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}
        title="Edit note"
        to={editRoute}
      >
        <Edit3 aria-hidden="true" className="size-3" />
      </Link>
    </div>
  );
}
