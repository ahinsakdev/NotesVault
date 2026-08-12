import {
  Calendar,
  Clock3,
  Folder,
  Pin,
  Plus,
  Star,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { DEFAULT_NOTE_FOLDER } from "@/features/folders/constants/folder.constants";
import { useFolders } from "@/features/folders/hooks/use-folders";
import type { Note } from "@/features/notes/types/note.types";
import { formatNoteDate } from "@/features/notes/utils/note.utils";

import type { NoteEditorValues } from "../types/note-editor.types";

type NoteEditorMetadataProps = {
  note: Note | null;
  values: NoteEditorValues;
  onFolderChange: (folderId: string, folderName: string) => void;
  onTagsChange: (tags: string[]) => void;
  onPinnedChange: (value: boolean) => void;
  onFavoriteChange: (value: boolean) => void;
  onTrash: () => void;
};

const MAX_TAG_LENGTH = 50;
const MAX_TAGS = 20;

export function NoteEditorMetadata({
  note,
  onFavoriteChange,
  onFolderChange,
  onPinnedChange,
  onTagsChange,
  onTrash,
  values,
}: NoteEditorMetadataProps) {
  const foldersQuery = useFolders();

  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState("");

  function handleFolderChange(folderId: string) {
    if (!folderId) {
      onFolderChange("", DEFAULT_NOTE_FOLDER);
      return;
    }

    const folder = foldersQuery.data?.find(
      (candidate) => candidate.id === folderId,
    );

    if (!folder) {
      return;
    }

    onFolderChange(folder.id, folder.name);
  }

  function handleAddTag(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedTag = tagInput.trim();

    if (!normalizedTag) {
      return;
    }

    if (normalizedTag.length > MAX_TAG_LENGTH) {
      setTagError(`Tags must be ${MAX_TAG_LENGTH} characters or fewer.`);
      return;
    }

    if (values.tags.length >= MAX_TAGS) {
      setTagError(`You can add up to ${MAX_TAGS} tags.`);
      return;
    }

    const alreadyExists = values.tags.some(
      (tag) => tag.toLocaleLowerCase() === normalizedTag.toLocaleLowerCase(),
    );

    if (alreadyExists) {
      setTagError("This tag has already been added.");
      return;
    }

    onTagsChange([...values.tags, normalizedTag]);
    setTagInput("");
    setTagError("");
  }

  function handleRemoveTag(tagToRemove: string) {
    onTagsChange(values.tags.filter((tag) => tag !== tagToRemove));

    setTagError("");
  }

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
            className="h-9 w-full border border-input bg-background px-3 text-xs text-foreground outline-none transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={foldersQuery.isLoading}
            onChange={(event) => handleFolderChange(event.target.value)}
            value={values.folderId}
          >
            <option value="">{DEFAULT_NOTE_FOLDER}</option>

            {(foldersQuery.data ?? []).map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>

          {foldersQuery.isError ? (
            <p className="mt-1.5 text-[10px] text-danger">
              Unable to load folders.
            </p>
          ) : null}
        </label>

        <div>
          <p className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Tag aria-hidden="true" className="size-3.5" />
            Tags
          </p>

          <form className="mt-2 flex gap-1.5" onSubmit={handleAddTag}>
            <input
              aria-label="Add tag"
              autoComplete="off"
              className="h-8 min-w-0 flex-1 border border-input bg-background px-2.5 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={values.tags.length >= MAX_TAGS}
              maxLength={MAX_TAG_LENGTH}
              onChange={(event) => {
                setTagInput(event.target.value);

                if (tagError) {
                  setTagError("");
                }
              }}
              placeholder="Add tag"
              value={tagInput}
            />

            <Button
              aria-label="Add tag"
              disabled={!tagInput.trim() || values.tags.length >= MAX_TAGS}
              size="sm"
              type="submit"
              variant="outline"
            >
              <Plus aria-hidden="true" className="size-3.5" />
            </Button>
          </form>

          {tagError ? (
            <p className="mt-1.5 text-[10px] text-danger">{tagError}</p>
          ) : null}

          <div className="mt-2 flex flex-wrap gap-1.5">
            {values.tags.length > 0 ? (
              values.tags.map((tag) => (
                <span
                  className="inline-flex max-w-full items-center gap-1 bg-secondary px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-secondary-foreground"
                  key={tag}
                >
                  <span className="truncate">{tag}</span>

                  <button
                    aria-label={`Remove ${tag} tag`}
                    className="shrink-0 text-secondary-foreground/60 transition-colors hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => handleRemoveTag(tag)}
                    type="button"
                  >
                    <X aria-hidden="true" className="size-2.5" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">No tags</span>
            )}
          </div>

          <p className="mt-2 text-[10px] text-muted-foreground">
            {values.tags.length}/{MAX_TAGS} tags
          </p>
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
          onClick={onTrash}
          size="sm"
          variant="danger"
        >
          Move to trash
        </Button>
      </div>
    </aside>
  );
}
