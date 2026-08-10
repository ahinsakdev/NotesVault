import {
  CircleHelp,
  Info,
  Keyboard,
  LogIn,
  Moon,
  Settings,
  Sun,
  UserPlus,
} from "lucide-react";
import { useRef, type RefObject } from "react";

import { ROUTES } from "@/app/routes";
import { useMenuKeyboardNavigation } from "@/hooks/use-menu-keyboard-navigation";
import { useTheme } from "@/hooks/use-theme";

import { ProfileMenuItem } from "./profile-menu-item";
import type { ProfileMenuState } from "./profile-menu.types";

type ProfileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  state: ProfileMenuState;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export function ProfileMenu({
  isOpen,
  onClose,
  state,
  triggerRef,
}: ProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { resolvedTheme, setTheme } = useTheme();

  const isDarkTheme = resolvedTheme === "dark";

  useMenuKeyboardNavigation({
    isOpen,
    menuRef,
    onClose,
    triggerRef,
  });

  if (!isOpen) {
    return null;
  }

  function handleThemeChange() {
    setTheme(isDarkTheme ? "light" : "dark");
  }

  return (
    <div
      aria-label="Profile menu"
      className="notesvault-profile-menu absolute right-0 top-[calc(100%+0.5rem)] z-[120] w-[min(18rem,calc(100vw-1.5rem))] border border-border bg-popover shadow-dialog"
      ref={menuRef}
      role="menu"
    >
      {state.status === "authenticated" ? (
        <header className="border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center bg-primary text-[10px] font-semibold text-primary-foreground">
              {state.user.initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-popover-foreground">
                {state.user.name}
              </p>

              <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                {state.user.email}
              </p>
            </div>
          </div>
        </header>
      ) : (
        <header className="border-b border-border px-4 py-3">
          <p className="text-xs font-semibold text-popover-foreground">
            NotesVault account
          </p>

          <p className="mt-1 text-[9px] leading-4 text-muted-foreground">
            Sign in to sync notes and access your workspace anywhere.
          </p>
        </header>
      )}

      <div className="py-1.5">
        {state.status === "guest" ? (
          <>
            <ProfileMenuItem
              description="Access your existing workspace"
              icon={LogIn}
              label="Sign in"
              to={ROUTES.login}
            />

            <ProfileMenuItem
              description="Create a new NotesVault account"
              icon={UserPlus}
              label="Create account"
              to={ROUTES.signup}
            />

            <div aria-hidden="true" className="my-1.5 border-t border-border" />
          </>
        ) : (
          <ProfileMenuItem
            icon={Settings}
            label="Account settings"
            to={ROUTES.settings}
          />
        )}

        <ProfileMenuItem
          icon={isDarkTheme ? Sun : Moon}
          label={isDarkTheme ? "Light appearance" : "Dark appearance"}
          onClick={handleThemeChange}
          trailing={isDarkTheme ? "Light" : "Dark"}
        />

        <ProfileMenuItem
          icon={Settings}
          label="Settings"
          to={ROUTES.settings}
        />

        <ProfileMenuItem
          icon={Keyboard}
          label="Keyboard shortcuts"
          onClick={onClose}
          trailing="⌘ /"
        />

        <div aria-hidden="true" className="my-1.5 border-t border-border" />

        <ProfileMenuItem
          icon={CircleHelp}
          label="Help and support"
          onClick={onClose}
        />

        <ProfileMenuItem
          icon={Info}
          label="About NotesVault"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
