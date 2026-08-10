import type { ReactNode } from "react";

import {
  AppShellContext,
  type AppShellContextValue,
} from "./app-shell-context";

type AppShellProviderProps = {
  children: ReactNode;
  value: AppShellContextValue;
};

export function AppShellProvider({ children, value }: AppShellProviderProps) {
  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  );
}
