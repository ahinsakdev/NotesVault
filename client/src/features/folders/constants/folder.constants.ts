export const NOTE_FOLDER_OPTIONS = [
  "Unfiled",
  "Work",
  "Personal",
  "Learning",
  "Ideas",
  "Career",
] as const;

export type NoteFolderOption = (typeof NOTE_FOLDER_OPTIONS)[number];

export const DEFAULT_NOTE_FOLDER: NoteFolderOption = "Unfiled";
