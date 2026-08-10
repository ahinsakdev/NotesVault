import { createContext } from "react";

import type { ToastVariant } from "./toast";

export type ShowToastOptions = {
  message: string;
  title?: string;
  variant?: ToastVariant;
};

export type ToastContextValue = {
  dismissToast: (id: string) => void;
  showToast: (options: ShowToastOptions) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
