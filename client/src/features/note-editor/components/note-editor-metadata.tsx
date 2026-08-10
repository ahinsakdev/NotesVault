import { Calendar, Clock3, Folder, Pin, Star, Tag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NOTE_FOLDER_OPTIONS } from "@/features/folders/constants/folder.constants";
import type { Note } from "@/features/notes/types/note.types";
import { formatNoteDate } from "@/features/notes/utils/note.utils";

import type { NoteEditorValues } from "../types/note-editor.types";

type NoteEditorMetadataProps = {
  note: Note | null;
  values: NoteEditorValues;
  onFolderChange: (value: string) => void;
  onPinnedChange: (value: boolean) => void;
  onFavoriteChange: (value: boolean) => void;
};

export function NoteEditorMetadata({
  note,
  onFavoriteChange,
  onFolderChange,
  onPinnedChange,
  values,
}: NoteEditorMetadataProps) {
  return (
    <aside className="w-full shrink-0 border-t border-border bg-surface-subtle px-5 py-5 xl:w-80 xl:border-l xl:border-t-0 xl:px-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Note details
      </h2>

      <div className="mt-5 space-y-5">
        <label className="block">
          <span className="mb-1.5 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Folder aria-hidden="true" className="size-3.5" />
            Folder
          </span>

          <select
            className="h-9 w-full border border-input bg-background px-3 text-xs text-foreground outline-none transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] focus:border-ring focus:ring-2 focus:ring-ring/20"
            onChange={(event) => onFolderChange(event.target.value)}
            value={values.folderName}
          >
            {NOTE_FOLDER_OPTIONS.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </label>

        <div>
          <p className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Tag aria-hidden="true" className="size-3.5" />
            Tags
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {values.tags.length > 0 ? (
              values.tags.map((tag) => (
                <span
                  className="bg-secondary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-secondary-foreground"
                  key={tag}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">No tags</span>
            )}
          </div>
        </div>

        <label className="flex items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Pin aria-hidden="true" className="size-3.5" />
            Pinned
          </span>

          <input
            checked={values.isPinned}
            className="size-4 accent-primary"
            onChange={(event) => onPinnedChange(event.target.checked)}
            type="checkbox"
          />
        </label>

        <label className="flex items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Star aria-hidden="true" className="size-3.5" />
            Favorite
          </span>

          <input
            checked={values.isFavorite}
            className="size-4 accent-primary"
            onChange={(event) => onFavoriteChange(event.target.checked)}
            type="checkbox"
          />
        </label>

        <div className="border-t border-border pt-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <Calendar aria-hidden="true" className="size-3.5" />
            Created {note ? formatNoteDate(note.createdAt) : "today"}
          </p>

          <p className="mt-2 flex items-center gap-2">
            <Clock3 aria-hidden="true" className="size-3.5" />
            Updated {note ? formatNoteDate(note.updatedAt) : "today"}
          </p>
        </div>

        <Button
          className="w-full"
          leftIcon={<Trash2 className="size-3.5" />}
          size="sm"
          variant="danger"
        >
          Move to trash
        </Button>
      </div>
    </aside>
  );
}
