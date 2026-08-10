import type { Note } from "@/features/notes/types/note.types";

import type { TagSummary } from "../types/tag.types";

export function getTagsFromNotes(notes: Note[]): TagSummary[] {
  const tags = new Map<string, TagSummary>();

  notes.forEach((note) => {
    if (note.deletedAt || note.isArchived) {
      return;
    }

    note.tags.forEach((tag) => {
      const existingTag = tags.get(tag);

      if (!existingTag) {
        tags.set(tag, {
          id: tag,
          name: tag,
          noteCount: 1,
          updatedAt: note.updatedAt,
        });

        return;
      }

      existingTag.noteCount += 1;

      if (
        new Date(note.updatedAt).getTime() >
        new Date(existingTag.updatedAt).getTime()
      ) {
        existingTag.updatedAt = note.updatedAt;
      }
    });
  });

  return [...tags.values()].sort((first, second) =>
    first.name.localeCompare(second.name),
  );
}
