import { FileText, Folder, Pin, Star } from "lucide-react";

import { ROUTES } from "@/app/routes";
import type { Folder as NotesVaultFolder } from "@/features/folders/types/folder.types";
import type { Note, NoteAccent } from "@/features/notes/types/note.types";
import { formatDate } from "@/utils/format-date";

import type {
  DashboardFolder,
  DashboardNote,
  DashboardStatistic,
} from "../types/dashboard.types";

const MAX_RECENT_NOTES = 2;
const MAX_PINNED_NOTES = 2;
const MAX_FOLDERS = 4;

const DEFAULT_FOLDER_ACCENTS: NoteAccent[] = [
  "purple",
  "blue",
  "green",
  "orange",
  "red",
];

function toDashboardNote(note: Note): DashboardNote {
  return {
    id: note.id,
    title: note.title || "Untitled note",
    preview: note.preview,
    updatedAt: formatDate(note.updatedAt),
    folder: note.folderName,
    tags: note.tags,
    accent: note.accent,
    isPinned: note.isPinned,
    isFavorite: note.isFavorite,
  };
}

export function createDashboardStatistics(
  notes: Note[],
  folders: NotesVaultFolder[],
): DashboardStatistic[] {
  const pinnedCount = notes.filter((note) => note.isPinned).length;
  const favoriteCount = notes.filter((note) => note.isFavorite).length;

  return [
    {
      id: "notes",
      title: "Total notes",
      value: notes.length,
      description: "Active notes",
      icon: FileText,
      accent: "purple",
      to: ROUTES.notes,
    },
    {
      id: "pinned",
      title: "Pinned notes",
      value: pinnedCount,
      description: "Kept within reach",
      icon: Pin,
      accent: "orange",
      to: ROUTES.pinned,
    },
    {
      id: "favorites",
      title: "Favorites",
      value: favoriteCount,
      description: "Saved favorites",
      icon: Star,
      accent: "red",
      to: ROUTES.favorites,
    },
    {
      id: "folders",
      title: "Folders",
      value: folders.length,
      description: "Organized collections",
      icon: Folder,
      accent: "green",
      to: ROUTES.folders,
    },
  ];
}

export function createRecentDashboardNotes(notes: Note[]): DashboardNote[] {
  return [...notes]
    .sort(
      (firstNote, secondNote) =>
        new Date(secondNote.updatedAt).getTime() -
        new Date(firstNote.updatedAt).getTime(),
    )
    .slice(0, MAX_RECENT_NOTES)
    .map(toDashboardNote);
}

export function createPinnedDashboardNotes(notes: Note[]): DashboardNote[] {
  return notes
    .filter((note) => note.isPinned)
    .sort(
      (firstNote, secondNote) =>
        new Date(secondNote.updatedAt).getTime() -
        new Date(firstNote.updatedAt).getTime(),
    )
    .slice(0, MAX_PINNED_NOTES)
    .map(toDashboardNote);
}

export function createDashboardFolders(
  folders: NotesVaultFolder[],
  notes: Note[],
): DashboardFolder[] {
  const noteCountByFolder = new Map<string, number>();
  const accentByFolder = new Map<string, NoteAccent>();

  for (const note of notes) {
    if (!note.folderId) {
      continue;
    }

    noteCountByFolder.set(
      note.folderId,
      (noteCountByFolder.get(note.folderId) ?? 0) + 1,
    );

    if (!accentByFolder.has(note.folderId)) {
      accentByFolder.set(note.folderId, note.accent);
    }
  }

  return folders
    .map((folder, index) => ({
      id: folder.id,
      name: folder.name,
      noteCount: noteCountByFolder.get(folder.id) ?? 0,
      accent:
        accentByFolder.get(folder.id) ??
        DEFAULT_FOLDER_ACCENTS[index % DEFAULT_FOLDER_ACCENTS.length],
    }))
    .sort(
      (firstFolder, secondFolder) =>
        secondFolder.noteCount - firstFolder.noteCount ||
        firstFolder.name.localeCompare(secondFolder.name),
    )
    .slice(0, MAX_FOLDERS);
}
