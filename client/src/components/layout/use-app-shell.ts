import { useContext } from "react";

import { AppShellContext } from "./app-shell-context";

export function useAppShell() {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error("useAppShell must be used inside AppShellProvider.");
  }

  return context;
}
