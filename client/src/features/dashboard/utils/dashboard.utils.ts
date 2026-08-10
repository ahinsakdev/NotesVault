import type {
  DashboardNoteAccent,
  DashboardStatisticAccent,
} from "../types/dashboard.types";

const noteAccentClasses: Record<DashboardNoteAccent, string> = {
  purple: "bg-note-purple",
  blue: "bg-note-blue",
  green: "bg-note-green",
  orange: "bg-note-orange",
  red: "bg-note-red",
};

const statisticAccentClasses: Record<
  DashboardStatisticAccent,
  {
    iconBackground: string;
    iconColor: string;
    descriptionColor: string;
  }
> = {
  purple: {
    iconBackground: "bg-[#f1edff]",
    iconColor: "text-note-purple",
    descriptionColor: "text-success",
  },
  orange: {
    iconBackground: "bg-[#fff3e3]",
    iconColor: "text-note-orange",
    descriptionColor: "text-success",
  },
  red: {
    iconBackground: "bg-[#fff0f0]",
    iconColor: "text-note-red",
    descriptionColor: "text-success",
  },
  green: {
    iconBackground: "bg-[#edf8f1]",
    iconColor: "text-note-green",
    descriptionColor: "text-muted-foreground",
  },
};

export function getDashboardAccentClass(accent: DashboardNoteAccent) {
  return noteAccentClasses[accent];
}

export function getDashboardStatisticAccentClasses(
  accent: DashboardStatisticAccent,
) {
  return statisticAccentClasses[accent];
}
