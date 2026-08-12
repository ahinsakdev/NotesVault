import { AppError } from "../../../shared/errors/app-error.js";
import { NoteModel } from "../../notes/models/note.model.js";
import { normalizeNoteTags } from "../../notes/utils/note-input.utils.js";

export type TagMutationResult = {
  updatedCount: number;
};

function normalizeTagName(tagName: string): string {
  return tagName.trim();
}

function createTagNotFoundError(): AppError {
  return new AppError(
    404,
    "Tag was not found",
    "TAG_NOT_FOUND",
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createExactTagPattern(tagName: string): RegExp {
  return new RegExp(
    `^${escapeRegExp(normalizeTagName(tagName))}$`,
    "i",
  );
}

function matchesTag(tag: string, tagName: string): boolean {
  return (
    tag.trim().toLocaleLowerCase() ===
    normalizeTagName(tagName).toLocaleLowerCase()
  );
}

export async function renameTagForUser(
  userId: string,
  currentTagName: string,
  nextTagName: string,
): Promise<TagMutationResult> {
  const normalizedCurrentTagName = normalizeTagName(currentTagName);
  const normalizedNextTagName = normalizeTagName(nextTagName);

  const notes = await NoteModel.find({
    userId,
    tags: createExactTagPattern(normalizedCurrentTagName),
  });

  if (notes.length === 0) {
    throw createTagNotFoundError();
  }

  await Promise.all(
    notes.map(async (note) => {
      note.tags = normalizeNoteTags(
        note.tags.map((tag) =>
          matchesTag(tag, normalizedCurrentTagName)
            ? normalizedNextTagName
            : tag,
        ),
      );

      await note.save();
    }),
  );

  return {
    updatedCount: notes.length,
  };
}

export async function deleteTagForUser(
  userId: string,
  tagName: string,
): Promise<TagMutationResult> {
  const normalizedTagName = normalizeTagName(tagName);

  const notes = await NoteModel.find({
    userId,
    tags: createExactTagPattern(normalizedTagName),
  });

  if (notes.length === 0) {
    throw createTagNotFoundError();
  }

  await Promise.all(
    notes.map(async (note) => {
      note.tags = normalizeNoteTags(
        note.tags.filter(
          (tag) => !matchesTag(tag, normalizedTagName),
        ),
      );

      await note.save();
    }),
  );

  return {
    updatedCount: notes.length,
  };
}
