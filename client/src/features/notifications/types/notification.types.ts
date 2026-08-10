import type { LucideIcon } from "lucide-react";

export type NotificationType =
  | "success"
  | "warning"
  | "security"
  | "system"
  | "note";

export type NotificationDestination =
  | {
      type: "note";
      noteId: string;
    }
  | {
      type: "route";
      route: string;
    }
  | null;

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  type: NotificationType;
  isRead: boolean;
  destination: NotificationDestination;
};

export type NotificationGroup = {
  id: "today" | "earlier";
  label: string;
  notifications: NotificationItem[];
};

export type NotificationVisual = {
  icon: LucideIcon;
  iconClassName: string;
  iconBackgroundClassName: string;
};
