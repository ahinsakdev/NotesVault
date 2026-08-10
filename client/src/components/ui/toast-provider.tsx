import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";

import { Toast, type ToastItem } from "./toast";
import { ToastContext, type ShowToastOptions } from "./toast-context";

const TOAST_DURATION = 4000;
const MAX_VISIBLE_TOASTS = 3;

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const timeoutIdsRef = useRef(new Map<string, number>());

  const clearToastTimeout = useCallback((id: string) => {
    const timeoutId = timeoutIdsRef.current.get(id);

    if (timeoutId === undefined) {
      return;
    }

    window.clearTimeout(timeoutId);
    timeoutIdsRef.current.delete(id);
  }, []);

  const dismissToast = useCallback(
    (id: string) => {
      clearToastTimeout(id);

      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id),
      );
    },
    [clearToastTimeout],
  );

  const showToast = useCallback(
    ({ message, title, variant = "info" }: ShowToastOptions) => {
      const id = crypto.randomUUID();

      const toast: ToastItem = {
        id,
        message,
        title,
        variant,
      };

      setToasts((currentToasts) => {
        const nextToasts = [...currentToasts, toast];

        if (nextToasts.length > MAX_VISIBLE_TOASTS) {
          const removedToasts = nextToasts.slice(
            0,
            nextToasts.length - MAX_VISIBLE_TOASTS,
          );

          removedToasts.forEach((removedToast) => {
            clearToastTimeout(removedToast.id);
          });
        }

        return nextToasts.slice(-MAX_VISIBLE_TOASTS);
      });

      const timeoutId = window.setTimeout(() => {
        dismissToast(id);
      }, TOAST_DURATION);

      timeoutIdsRef.current.set(id, timeoutId);
    },
    [clearToastTimeout, dismissToast],
  );

  useEffect(() => {
    const timeoutIds = timeoutIdsRef.current;

    return () => {
      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });

      timeoutIds.clear();
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      dismissToast,
      showToast,
    }),
    [dismissToast, showToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {typeof document !== "undefined"
        ? createPortal(
            <div
              aria-label="Notifications"
              className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2"
            >
              {toasts.map((toast) => (
                <Toast {...toast} key={toast.id} onDismiss={dismissToast} />
              ))}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}
