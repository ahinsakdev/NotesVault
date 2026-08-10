import {
  Bell,
  CheckCircle2,
  FileText,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import type {
  NotificationGroup,
  NotificationItem,
  NotificationType,
  NotificationVisual,
} from "../types/notification.types";

const notificationVisuals: Record<NotificationType, NotificationVisual> = {
  success: {
    icon: CheckCircle2,
    iconClassName: "text-success",
    iconBackgroundClassName: "bg-success-subtle",
  },
  warning: {
    icon: TriangleAlert,
    iconClassName: "text-warning",
    iconBackgroundClassName: "bg-warning-subtle",
  },
  security: {
    icon: ShieldCheck,
    iconClassName: "text-primary",
    iconBackgroundClassName: "bg-primary/10",
  },
  system: {
    icon: Bell,
    iconClassName: "text-muted-foreground",
    iconBackgroundClassName: "bg-surface-subtle",
  },
  note: {
    icon: FileText,
    iconClassName: "text-primary",
    iconBackgroundClassName: "bg-primary/10",
  },
};

function isToday(value: string): boolean {
  const date = new Date(value);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function getNotificationVisual(
  type: NotificationType,
): NotificationVisual {
  return notificationVisuals[type];
}

export function groupNotifications(
  notifications: NotificationItem[],
): NotificationGroup[] {
  const sortedNotifications = [...notifications].sort(
    (first, second) =>
      new Date(second.createdAt).getTime() -
      new Date(first.createdAt).getTime(),
  );

  const todayNotifications = sortedNotifications.filter((notification) =>
    isToday(notification.createdAt),
  );

  const earlierNotifications = sortedNotifications.filter(
    (notification) => !isToday(notification.createdAt),
  );

  const groups: NotificationGroup[] = [
    {
      id: "today",
      label: "Today",
      notifications: todayNotifications,
    },
    {
      id: "earlier",
      label: "Earlier",
      notifications: earlierNotifications,
    },
  ];

  return groups.filter((group) => group.notifications.length > 0);
}

export function formatNotificationTime(value: string): string {
  const date = new Date(value);
  const now = new Date();

  const differenceInMinutes = Math.max(
    0,
    Math.floor((now.getTime() - date.getTime()) / 60_000),
  );

  if (differenceInMinutes < 1) {
    return "Just now";
  }

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}m ago`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);

  if (differenceInHours < 24) {
    return `${differenceInHours}h ago`;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}
