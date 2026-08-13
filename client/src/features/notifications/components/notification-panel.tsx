import { CheckCheck } from "lucide-react";
import { useRef, type RefObject } from "react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { useDisclosurePanel } from "@/hooks/use-disclosure-panel";

import type {
  NotificationGroup,
  NotificationItem,
} from "../types/notification.types";
import { NotificationItem as NotificationItemComponent } from "./notification-item";
import { NotificationsEmptyState } from "./notifications-empty-state";

type NotificationPanelProps = {
  groups: NotificationGroup[];
  isOpen: boolean;
  notifications: NotificationItem[];
  triggerRef: RefObject<HTMLButtonElement | null>;
  unreadCount: number;
  onClose: () => void;
  onDismiss: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onMarkAsRead: (notificationId: string) => void;
};

export function NotificationPanel({
  groups,
  isOpen,
  notifications,
  onClose,
  onDismiss,
  onMarkAllAsRead,
  onMarkAsRead,
  triggerRef,
  unreadCount,
}: NotificationPanelProps) {
  const navigate = useNavigate();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstActionRef = useRef<HTMLButtonElement | null>(null);

  useDisclosurePanel({
    initialFocusRef: firstActionRef,
    isOpen,
    onClose,
    panelRef,
    triggerRef,
  });

  if (!isOpen) {
    return null;
  }

  function openNotification(notification: NotificationItem) {
    onMarkAsRead(notification.id);

    if (!notification.destination) {
      onClose();
      return;
    }

    if (notification.destination.type === "note") {
      navigate(
        ROUTES.noteRead.replace(":noteId", notification.destination.noteId),
      );

      onClose();
      return;
    }

    navigate(notification.destination.route);
    onClose();
  }

  return (
    <div
      aria-label="Notifications"
      className="notesvault-overlay-popover fixed left-3 right-3 top-[calc(3.25rem+0.5rem)] z-[120] w-auto border border-border bg-popover shadow-dialog sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+0.5rem)] sm:w-[min(23rem,calc(100vw-1.5rem))]"
      id="notesvault-notifications-panel"
      ref={panelRef}
      role="region"
      tabIndex={-1}
    >
      <header className="flex min-h-12 items-center gap-3 border-b border-border px-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xs font-semibold text-popover-foreground">
            Notifications
          </h2>

          <p className="mt-0.5 text-[9px] text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} unread notification${
                  unreadCount === 1 ? "" : "s"
                }`
              : "No unread notifications"}
          </p>
        </div>

        {unreadCount > 0 ? (
          <button
            className="notesvault-focus-ring inline-flex h-7 items-center gap-1.5 px-2 text-[9px] font-medium text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={onMarkAllAsRead}
            ref={firstActionRef}
            type="button"
          >
            <CheckCheck aria-hidden="true" className="size-3" />
            Mark all read
          </button>
        ) : null}
      </header>

      <div className="max-h-[min(32rem,70vh)] overflow-y-auto">
        {notifications.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          groups.map((group) => (
            <section key={group.id}>
              <div className="sticky top-0 z-10 border-y border-border bg-surface-subtle px-4 py-1.5">
                <h3 className="text-[8px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {group.label}
                </h3>
              </div>

              <div className="divide-y divide-border/70">
                {group.notifications.map((notification) => (
                  <NotificationItemComponent
                    key={notification.id}
                    notification={notification}
                    onDismiss={onDismiss}
                    onOpen={openNotification}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      <footer className="border-t border-border bg-surface-subtle px-4 py-2.5">
        <p className="text-center text-[9px] text-muted-foreground">
          Workspace activity and important updates
        </p>
      </footer>
    </div>
  );
}
