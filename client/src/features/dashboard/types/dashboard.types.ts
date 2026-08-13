import type { LucideIcon } from "lucide-react";

export type DashboardStatisticAccent = "purple" | "orange" | "red" | "green";

export type DashboardStatistic = {
  id: string;
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  accent: DashboardStatisticAccent;
  to: string;
};

export type DashboardNoteAccent =
  | "purple"
  | "blue"
  | "green"
  | "orange"
  | "red";

export type DashboardNote = {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  folder: string;
  tags: string[];
  accent: DashboardNoteAccent;
  isPinned: boolean;
  isFavorite: boolean;
};

export type DashboardFolder = {
  id: string;
  name: string;
  noteCount: number;
  accent: DashboardNoteAccent;
};
