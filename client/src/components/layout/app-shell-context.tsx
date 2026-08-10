import { createContext } from "react";

export type AppShellContextValue = {
  isFocusMode: boolean;
  enterFocusMode: () => void;
  exitFocusMode: () => void;
};

export const AppShellContext = createContext<AppShellContextValue | null>(null);
