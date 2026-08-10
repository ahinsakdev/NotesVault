import { X } from "lucide-react";

import { cn } from "@/utils/cn";

import type { NotificationItem as Notification } from "../types/notification.types";
import {
  formatNotificationTime,
  getNotificationVisual,
} from "../utils/notification.utils";

type NotificationItemProps = {
  notification: Notification;
  onDismiss: (notificationId: string) => void;
  onOpen: (notification: Notification) => void;
};

export function NotificationItem({
  notification,
  onDismiss,
  onOpen,
}: NotificationItemProps) {
  const visual = getNotificationVisual(notification.type);
  const Icon = visual.icon;

  return (
    <article
      className={cn(
        "group relative flex gap-3 px-4 py-3 transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
        notification.isRead
          ? "bg-popover hover:bg-surface-subtle"
          : "bg-primary/[0.045] hover:bg-primary/[0.07] dark:bg-primary/[0.08] dark:hover:bg-primary/[0.12]",
      )}
    >
      <button
        aria-label={`Open notification: ${notification.title}`}
        className="absolute inset-0 z-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        onClick={() => onOpen(notification)}
        type="button"
      />

      <div
        className={cn(
          "pointer-events-none relative z-10 flex size-8 shrink-0 items-center justify-center",
          visual.iconBackgroundClassName,
          visual.iconClassName,
        )}
      >
        <Icon aria-hidden="true" className="size-3.5" />
      </div>

      <div className="pointer-events-none relative z-10 min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <h3 className="min-w-0 flex-1 text-[11px] font-semibold leading-4 text-foreground">
            {notification.title}
          </h3>

          {!notification.isRead ? (
            <span
              aria-label="Unread notification"
              className="mt-1 size-1.5 shrink-0 rounded-full bg-primary"
            />
          ) : null}
        </div>

        <p className="mt-1 line-clamp-2 text-[10px] leading-[1.55] text-muted-foreground">
          {notification.description}
        </p>

        <time
          className="mt-1.5 block text-[9px] text-muted-foreground"
          dateTime={notification.createdAt}
        >
          {formatNotificationTime(notification.createdAt)}
        </time>
      </div>

      <button
        aria-label={`Dismiss ${notification.title}`}
        className="relative z-20 flex size-6 shrink-0 items-center justify-center text-muted-foreground opacity-0 transition-[opacity,background-color,color] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100"
        onClick={() => onDismiss(notification.id)}
        title="Dismiss notification"
        type="button"
      >
        <X aria-hidden="true" className="size-3" />
      </button>
    </article>
  );
}
