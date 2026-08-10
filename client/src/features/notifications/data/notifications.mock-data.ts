import { ROUTES } from "@/app/routes";

import type { NotificationItem } from "../types/notification.types";

export const notificationsMockData: NotificationItem[] = [
  {
    id: "notification-1",
    title: "Welcome to NotesVault",
    description:
      "Your workspace is ready. Create your first note or organize existing ideas.",
    createdAt: "2026-08-04T09:12:00.000Z",
    type: "system",
    isRead: false,
    destination: {
      type: "route",
      route: ROUTES.dashboard,
    },
  },
  {
    id: "notification-2",
    title: "Export completed",
    description:
      "Your Markdown export was prepared successfully and is ready on this device.",
    createdAt: "2026-08-04T07:35:00.000Z",
    type: "success",
    isRead: false,
    destination: {
      type: "route",
      route: ROUTES.notes,
    },
  },
  {
    id: "notification-3",
    title: "Pinned note updated",
    description:
      "Project planning notes were edited recently and remain pinned to your workspace.",
    createdAt: "2026-08-03T15:20:00.000Z",
    type: "note",
    isRead: true,
    destination: {
      type: "note",
      noteId: "project-roadmap-q2",
    },
  },
  {
    id: "notification-4",
    title: "Trash retention reminder",
    description:
      "Deleted notes will remain recoverable for 30 days before permanent removal.",
    createdAt: "2026-08-02T11:45:00.000Z",
    type: "warning",
    isRead: true,
    destination: {
      type: "route",
      route: ROUTES.trash,
    },
  },
  {
    id: "notification-5",
    title: "Security check complete",
    description:
      "No unusual activity was detected in your NotesVault workspace.",
    createdAt: "2026-08-01T08:05:00.000Z",
    type: "security",
    isRead: true,
    destination: {
      type: "route",
      route: ROUTES.settings,
    },
  },
];
