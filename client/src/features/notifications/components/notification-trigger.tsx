import { Bell } from "lucide-react";
import { useRef, useState } from "react";

import { useNotifications } from "../hooks/use-notifications";
import { NotificationPanel } from "./notification-panel";

export function NotificationTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const {
    dismissNotification,
    groups,
    markAllAsRead,
    markAsRead,
    notifications,
    unreadCount,
  } = useNotifications();

  return (
    <div className="relative z-[80]">
      <button
        aria-controls="notesvault-notifications-panel"
        aria-expanded={isOpen}
        aria-label={
          unreadCount > 0
            ? `Open notifications, ${unreadCount} unread`
            : "Open notifications"
        }
        className="relative flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        ref={triggerRef}
        type="button"
      >
        <Bell aria-hidden="true" className="size-4" strokeWidth={1.8} />

        {unreadCount > 0 ? (
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 flex min-w-3.5 items-center justify-center rounded-full border border-background bg-danger px-1 text-[7px] font-semibold leading-3 text-white"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      <NotificationPanel
        groups={groups}
        isOpen={isOpen}
        notifications={notifications}
        onClose={() => setIsOpen(false)}
        onDismiss={dismissNotification}
        onMarkAllAsRead={markAllAsRead}
        onMarkAsRead={markAsRead}
        triggerRef={triggerRef}
        unreadCount={unreadCount}
      />
    </div>
  );
}
