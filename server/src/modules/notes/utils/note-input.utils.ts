import { NOTE_VALIDATION } from "../constants/note.constants.js";

export function normalizeNoteTitle(title: string): string {
  return title.trim();
}

export function normalizeNoteFolderName(folderName: string): string {
  const normalizedFolderName = folderName.trim();

  return normalizedFolderName || "Unfiled";
}

export function normalizeNoteTags(tags: string[]): string[] {
  const normalizedTags: string[] = [];
  const normalizedTagKeys = new Set<string>();

  for (const tag of tags) {
    const normalizedTag = tag.trim();

    if (!normalizedTag) {
      continue;
    }

    const normalizedTagKey = normalizedTag.toLocaleLowerCase();

    if (normalizedTagKeys.has(normalizedTagKey)) {
      continue;
    }

    normalizedTagKeys.add(normalizedTagKey);
    normalizedTags.push(normalizedTag);

    if (normalizedTags.length === NOTE_VALIDATION.maxTags) {
      break;
    }
  }

  return normalizedTags;
}
