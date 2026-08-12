import { FileText, Folder, Pin, Star } from "lucide-react";

import type { Note } from "@/features/notes/types/note.types";
import { formatDate } from "@/utils/format-date";

import type {
  DashboardFolder,
  DashboardNote,
  DashboardStatistic,
} from "../types/dashboard.types";

const MAX_RECENT_NOTES = 2;
const MAX_PINNED_NOTES = 2;
const MAX_FOLDERS = 4;

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
): DashboardStatistic[] {
  const pinnedCount = notes.filter((note) => note.isPinned).length;
  const favoriteCount = notes.filter((note) => note.isFavorite).length;
  const folderCount = new Set(
    notes.map((note) => note.folderName).filter(Boolean),
  ).size;

  return [
    {
      id: "notes",
      title: "Total notes",
      value: notes.length,
      description: "Active notes",
      icon: FileText,
      accent: "purple",
    },
    {
      id: "pinned",
      title: "Pinned notes",
      value: pinnedCount,
      description: "Kept within reach",
      icon: Pin,
      accent: "orange",
    },
    {
      id: "favorites",
      title: "Favorites",
      value: favoriteCount,
      description: "Saved favorites",
      icon: Star,
      accent: "red",
    },
    {
      id: "folders",
      title: "Folders",
      value: folderCount,
      description: "Organized collections",
      icon: Folder,
      accent: "green",
    },
  ];
}

export function createRecentDashboardNotes(
  notes: Note[],
): DashboardNote[] {
  return [...notes]
    .sort(
      (firstNote, secondNote) =>
        new Date(secondNote.updatedAt).getTime() -
        new Date(firstNote.updatedAt).getTime(),
    )
    .slice(0, MAX_RECENT_NOTES)
    .map(toDashboardNote);
}

export function createPinnedDashboardNotes(
  notes: Note[],
): DashboardNote[] {
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
  notes: Note[],
): DashboardFolder[] {
  const folders = new Map<string, DashboardFolder>();

  for (const note of notes) {
    const folderName = note.folderName.trim();

    if (!folderName) {
      continue;
    }

    const existingFolder = folders.get(folderName);

    if (existingFolder) {
      existingFolder.noteCount += 1;
      continue;
    }

    folders.set(folderName, {
      id: note.folderId,
      name: folderName,
      noteCount: 1,
      accent: note.accent,
    });
  }

  return [...folders.values()]
    .sort(
      (firstFolder, secondFolder) =>
        secondFolder.noteCount - firstFolder.noteCount ||
        firstFolder.name.localeCompare(secondFolder.name),
    )
    .slice(0, MAX_FOLDERS);
}
