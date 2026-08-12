export const NOTE_VALIDATION = {
  titleMaxLength: 200,
  previewMaxLength: 500,
  folderNameMaxLength: 100,
  tagMaxLength: 50,
  maxTags: 20,
} as const;

export const NOTE_ACCENTS = [
  "purple",
  "blue",
  "green",
  "orange",
  "red",
] as const;

export type NoteAccent = (typeof NOTE_ACCENTS)[number];
