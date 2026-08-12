import { NOTE_VALIDATION } from "../constants/note.constants.js";

export function normalizeNoteTitle(title: string): string {
  return title.trim();
}

export function normalizeNoteFolderName(folderName: string): string {
  const normalizedFolderName = folderName.trim();

  return normalizedFolderName || "Notes";
}

export function normalizeNoteTags(tags: string[]): string[] {
  const normalizedTags = tags
    .map((tag) => tag.trim())
    .filter(Boolean);

  return [...new Set(normalizedTags)].slice(
    0,
    NOTE_VALIDATION.maxTags,
  );
}
