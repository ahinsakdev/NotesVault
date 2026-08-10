import { ChevronDown } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router";

import { cn } from "@/utils/cn";

import { AppHeader } from "./app-header";
import { AppShellProvider } from "./app-shell-provider";
import { AppSidebar } from "./app-sidebar";
import { MobileSidebar } from "./mobile-sidebar";

export function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const mobileSidebarTriggerRef = useRef<HTMLButtonElement>(null);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFocusHeaderVisible, setIsFocusHeaderVisible] = useState(false);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen((currentValue) => !currentValue);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);

    window.requestAnimationFrame(() => {
      mobileSidebarTriggerRef.current?.focus();
    });
  }, []);

  const enterFocusMode = useCallback(() => {
    setIsMobileSidebarOpen(false);
    setIsFocusMode(true);
    setIsFocusHeaderVisible(false);
  }, []);

  const exitFocusMode = useCallback(() => {
    setIsFocusMode(false);
    setIsFocusHeaderVisible(false);
  }, []);

  const toggleFocusHeader = useCallback(() => {
    setIsFocusHeaderVisible((currentValue) => !currentValue);
  }, []);

  const appShellValue = useMemo(
    () => ({
      enterFocusMode,
      exitFocusMode,
      isFocusMode,
    }),
    [enterFocusMode, exitFocusMode, isFocusMode],
  );

  return (
    <AppShellProvider value={appShellValue}>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <AppSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() =>
            setIsSidebarCollapsed((currentValue) => !currentValue)
          }
        />

        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={closeMobileSidebar}
        />

        <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          <div
            className={cn(
              "relative z-50 shrink-0 overflow-visible transition-[max-height,opacity,transform] duration-[var(--motion-slow)] ease-[var(--motion-ease-soft)]",
              !isFocusMode || isFocusHeaderVisible
                ? "max-h-13 translate-y-0 opacity-100"
                : "pointer-events-none max-h-0 -translate-y-full opacity-0",
            )}
          >
            <AppHeader
              isMobileSidebarOpen={isMobileSidebarOpen}
              mobileSidebarTriggerRef={mobileSidebarTriggerRef}
              onToggleMobileSidebar={toggleMobileSidebar}
            />
          </div>

          {isFocusMode ? (
            <button
              aria-expanded={isFocusHeaderVisible}
              aria-label={
                isFocusHeaderVisible
                  ? "Hide application header"
                  : "Show application header"
              }
              className={cn(
                "focus-header-control absolute left-1/2 top-0 z-[60]",
                !isFocusHeaderVisible && "focus-header-control--attention",
              )}
              onClick={toggleFocusHeader}
              title={isFocusHeaderVisible ? "Hide header" : "Show header"}
              type="button"
            >
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "focus-header-control__icon size-3.5",
                  isFocusHeaderVisible &&
                    "focus-header-control__icon--expanded",
                )}
              />
            </button>
          ) : null}

          <main
            className="relative z-0 min-h-0 min-w-0 flex-1 overflow-y-auto bg-background"
            data-app-scroll-container
          >
            <div
              className={cn(
                "mx-auto w-full",
                isFocusMode
                  ? "flex min-h-full min-w-0 max-w-none flex-col px-3 py-3 sm:px-4 sm:py-4"
                  : "max-w-[1480px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8",
              )}
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </AppShellProvider>
  );
}
