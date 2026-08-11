import { LogOut, Settings } from "lucide-react";
import { NavLink, useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { useAuthenticationSession } from "@/features/authentication/hooks/use-authentication-session";
import { useLogout } from "@/features/authentication/hooks/use-logout";
import {
  getAuthenticatedUserInitials,
  getAuthenticatedUserName,
} from "@/features/authentication/utils/authenticated-user-display";
import { useToast } from "@/hooks/use-toast";
import { getApiErrorMessage } from "@/services/api/get-api-error";
import { cn } from "@/utils/cn";

type SidebarAccountSectionProps = {
  isCollapsed?: boolean;
  onNavigate?: () => void;
};

export function SidebarAccountSection({
  isCollapsed = false,
  onNavigate,
}: SidebarAccountSectionProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data: session } = useAuthenticationSession();
  const logoutMutation = useLogout();

  if (!session) {
    return null;
  }

  const name = getAuthenticatedUserName(session.user);
  const initials = getAuthenticatedUserInitials(session.user);

  async function handleLogout() {
    if (logoutMutation.isPending) {
      return;
    }

    try {
      await logoutMutation.mutateAsync();

      onNavigate?.();

      navigate(ROUTES.login, {
        replace: true,
      });
    } catch (error) {
      showToast({
        title: "Unable to log out",
        message: getApiErrorMessage(
          error,
          "We couldn't log you out. Please try again.",
        ),
        variant: "error",
      });
    }
  }

  if (isCollapsed) {
    return (
      <div className="shrink-0 border-t border-border pt-2">
        <div className="flex flex-col items-center gap-0.5">
          <button
            aria-label="Open profile"
            className="notesvault-focus-ring mb-1.5 flex size-8 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground"
            title={name}
            type="button"
          >
            {initials}
          </button>

          <NavLink
            aria-label="Settings"
            className={({ isActive }) =>
              cn(
                "notesvault-shell-nav-item flex size-9 items-center justify-center transition-[background-color,color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
                isActive
                  ? "bg-secondary text-foreground shadow-[inset_3px_0_0_var(--primary)]"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
              )
            }
            onClick={onNavigate}
            title="Settings"
            to={ROUTES.settings}
          >
            <Settings
              aria-hidden="true"
              className="notesvault-shell-nav-icon size-4"
              strokeWidth={1.8}
            />
          </NavLink>

          <button
            aria-label="Log out"
            className="notesvault-focus-ring flex size-9 items-center justify-center text-muted-foreground transition-[background-color,color] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
            disabled={logoutMutation.isPending}
            onClick={() => void handleLogout()}
            title={logoutMutation.isPending ? "Logging out" : "Log out"}
            type="button"
          >
            <LogOut aria-hidden="true" className="size-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0 border-t border-border pt-2">
      <button
        className="notesvault-focus-ring flex w-full items-center gap-3 px-3 py-1.5 text-left transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary/70"
        type="button"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
          {initials}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-foreground">
            {name}
          </span>

          <span className="block truncate text-[9px] text-muted-foreground">
            {session.user.email}
          </span>
        </span>
      </button>

      <div className="mt-1 space-y-0.5">
        <NavLink
          className={({ isActive }) =>
            cn(
              "notesvault-shell-nav-item flex min-h-9 items-center gap-3 px-3 text-sm font-medium transition-[background-color,color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
              isActive
                ? "bg-secondary text-foreground shadow-[inset_3px_0_0_var(--primary)]"
                : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
            )
          }
          onClick={onNavigate}
          to={ROUTES.settings}
        >
          <Settings
            aria-hidden="true"
            className="notesvault-shell-nav-icon size-4 shrink-0"
            strokeWidth={1.8}
          />

          <span>Settings</span>
        </NavLink>

        <button
          className="notesvault-focus-ring flex min-h-9 w-full items-center gap-3 px-3 text-sm font-medium text-muted-foreground transition-[background-color,color] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
          disabled={logoutMutation.isPending}
          onClick={() => void handleLogout()}
          type="button"
        >
          <LogOut
            aria-hidden="true"
            className="size-4 shrink-0"
            strokeWidth={1.8}
          />

          <span>{logoutMutation.isPending ? "Logging out..." : "Log out"}</span>
        </button>
      </div>
    </div>
  );
}
