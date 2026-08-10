import { FileText, Folder, Pin, Star } from "lucide-react";

import { notesMockData } from "@/features/notes/data/notes.mock-data";
import { formatNoteDate } from "@/features/notes/utils/note.utils";

import type {
  DashboardFolder,
  DashboardNote,
  DashboardStatistic,
} from "../types/dashboard.types";

function toDashboardNote(noteId: string): DashboardNote {
  const note = notesMockData.find((currentNote) => currentNote.id === noteId);

  if (!note) {
    throw new Error(`Dashboard note "${noteId}" was not found.`);
  }

  return {
    id: note.id,
    title: note.title,
    preview: note.preview,
    updatedAt: formatNoteDate(note.updatedAt),
    folder: note.folderName,
    tags: [...note.tags],
    accent: note.accent,
    isPinned: note.isPinned,
    isFavorite: note.isFavorite,
  };
}

export const dashboardStatistics: DashboardStatistic[] = [
  {
    id: "notes",
    title: "Total notes",
    value: 128,
    description: "+12 this week",
    icon: FileText,
    accent: "purple",
  },
  {
    id: "pinned",
    title: "Pinned notes",
    value: 12,
    description: "+3 this week",
    icon: Pin,
    accent: "orange",
  },
  {
    id: "favorites",
    title: "Favorites",
    value: 24,
    description: "+5 this week",
    icon: Star,
    accent: "red",
  },
  {
    id: "folders",
    title: "Folders",
    value: 7,
    description: "Organized collections",
    icon: Folder,
    accent: "green",
  },
];

export const recentNotes: DashboardNote[] = [
  toDashboardNote("notesvault-frontend-preview"),
  toDashboardNote("todo-app-ideas"),
];

export const pinnedNotes: DashboardNote[] = [
  toDashboardNote("project-roadmap-q2"),
  toDashboardNote("frontend-interview-notes"),
];

export const folders: DashboardFolder[] = [
  {
    id: "work",
    name: "Work",
    noteCount: 34,
    accent: "purple",
  },
  {
    id: "personal",
    name: "Personal",
    noteCount: 26,
    accent: "blue",
  },
  {
    id: "learning",
    name: "Learning",
    noteCount: 41,
    accent: "green",
  },
  {
    id: "ideas",
    name: "Ideas",
    noteCount: 17,
    accent: "orange",
  },
];
