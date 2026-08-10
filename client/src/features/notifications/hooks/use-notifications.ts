import { useCallback, useMemo, useState } from "react";

import { notificationsMockData } from "../data/notifications.mock-data";
import { groupNotifications } from "../utils/notification.utils";

export function useNotifications() {
  const [notifications, setNotifications] = useState(() =>
    notificationsMockData.map((notification) => ({
      ...notification,
      destination: notification.destination
        ? { ...notification.destination }
        : null,
    })),
  );

  const groups = useMemo(
    () => groupNotifications(notifications),
    [notifications],
  );

  const unreadCount = useMemo(
    () =>
      notifications.reduce(
        (total, notification) => total + (notification.isRead ? 0 : 1),
        0,
      ),
    [notifications],
  );

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              isRead: true,
            }
          : notification,
      ),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
  }, []);

  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== notificationId,
      ),
    );
  }, []);

  return {
    dismissNotification,
    groups,
    markAllAsRead,
    markAsRead,
    notifications,
    unreadCount,
  };
}
