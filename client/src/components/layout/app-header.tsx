import { Menu, Moon, Sun } from "lucide-react";
import { useState, type Ref } from "react";

import { GlobalSearchDialog } from "@/features/global-search/components/global-search-dialog";
import { GlobalSearchTrigger } from "@/features/global-search/components/global-search-trigger";
import { NotificationTrigger } from "@/features/notifications/components/notification-trigger";
import { useTheme } from "@/hooks/use-theme";

import { ProfileMenuTrigger } from "./profile-menu/profile-menu-trigger";

type AppHeaderProps = {
  isMobileSidebarOpen: boolean;
  mobileSidebarTriggerRef: Ref<HTMLButtonElement>;
  onToggleMobileSidebar: () => void;
};

export function AppHeader({
  isMobileSidebarOpen,
  mobileSidebarTriggerRef,
  onToggleMobileSidebar,
}: AppHeaderProps) {
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  const isDarkTheme = resolvedTheme === "dark";

  function handleThemeChange() {
    setTheme(isDarkTheme ? "light" : "dark");
  }

  return (
    <>
      <header className="relative z-50 flex h-13 shrink-0 items-center gap-3 border-b border-border bg-background px-4 sm:px-6 lg:px-7">
        <button
          aria-controls="notesvault-mobile-sidebar"
          aria-expanded={isMobileSidebarOpen}
          aria-label={
            isMobileSidebarOpen ? "Close navigation" : "Open navigation"
          }
          className="flex size-8 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          onClick={onToggleMobileSidebar}
          ref={mobileSidebarTriggerRef}
          type="button"
        >
          <Menu aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </button>

        <GlobalSearchTrigger onClick={() => setIsGlobalSearchOpen(true)} />

        <div className="ml-auto flex h-9 items-center gap-2.5">
          <button
            aria-label={
              isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
            }
            className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={handleThemeChange}
            type="button"
          >
            {isDarkTheme ? (
              <Sun aria-hidden="true" className="size-4" strokeWidth={1.8} />
            ) : (
              <Moon aria-hidden="true" className="size-4" strokeWidth={1.8} />
            )}
          </button>

          <NotificationTrigger />

          <ProfileMenuTrigger />
        </div>
      </header>

      <GlobalSearchDialog
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        onOpen={() => setIsGlobalSearchOpen(true)}
      />
    </>
  );
}
