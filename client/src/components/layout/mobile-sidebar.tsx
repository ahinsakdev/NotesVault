import {
  Archive,
  FileText,
  Folder,
  History,
  LayoutDashboard,
  Pin,
  Plus,
  Search,
  Star,
  Tags,
  Trash2,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

import { SidebarAccountSection } from "./sidebar-account-section";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const primaryNavigation = [
  {
    label: "Dashboard",
    to: ROUTES.dashboard,
    icon: LayoutDashboard,
  },
  {
    label: "All notes",
    to: ROUTES.notes,
    icon: FileText,
  },
  {
    label: "Search",
    to: ROUTES.search,
    icon: Search,
  },
] as const;

const libraryNavigation = [
  {
    label: "Recent",
    to: ROUTES.recent,
    icon: History,
  },
  {
    label: "Favorites",
    to: ROUTES.favorites,
    icon: Star,
  },
  {
    label: "Pinned",
    to: ROUTES.pinned,
    icon: Pin,
  },
  {
    label: "Archived",
    to: ROUTES.archived,
    icon: Archive,
  },
  {
    label: "Folders",
    to: ROUTES.folders,
    icon: Folder,
  },
  {
    label: "Tags",
    to: ROUTES.tags,
    icon: Tags,
  },
  {
    label: "Trash",
    to: ROUTES.trash,
    icon: Trash2,
  },
] as const;

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const navigate = useNavigate();

  function handleCreateNote() {
    onClose();

    navigate(ROUTES.noteDetails.replace(":noteId", "new"));
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      id="notesvault-mobile-sidebar"
      inert={!isOpen}
    >
      <button
        aria-label="Close navigation"
        className={cn(
          "absolute inset-0 bg-black/35 transition-opacity duration-[var(--motion-fast)] ease-[var(--motion-ease-standard)]",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
        type="button"
      />

      <aside
        aria-label="Mobile navigation"
        className={cn(
          "relative flex h-full w-[min(82vw,19rem)] flex-col overflow-hidden border-r border-border bg-surface-subtle transition-transform duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)]",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-13 shrink-0 items-center justify-between border-b border-border px-4">
          <div className="flex min-w-0 items-center gap-3">
            <FileText
              aria-hidden="true"
              className="size-5 shrink-0 text-primary"
              strokeWidth={1.8}
            />

            <span className="truncate text-lg font-semibold tracking-[-0.04em]">
              NotesVault
            </span>
          </div>

          <button
            aria-label="Close navigation"
            className="notesvault-focus-ring flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary/70 hover:text-foreground"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-3 py-3">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Button
              className="mb-4 w-full"
              leftIcon={<Plus className="size-4" />}
              onClick={handleCreateNote}
              size="sm"
            >
              New note
            </Button>

            <nav aria-label="Primary navigation" className="space-y-0.5">
              {primaryNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "notesvault-shell-nav-item flex min-h-9 items-center gap-3 px-3 text-sm font-medium transition-[background-color,color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
                        isActive
                          ? "bg-secondary text-foreground shadow-[inset_3px_0_0_var(--primary)]"
                          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                      )
                    }
                    end={item.to === ROUTES.notes}
                    key={item.label}
                    onClick={onClose}
                    to={item.to}
                  >
                    <Icon
                      aria-hidden="true"
                      className="notesvault-shell-nav-icon size-4 shrink-0"
                      strokeWidth={1.8}
                    />

                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="my-3 border-t border-border" />

            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Library
            </p>

            <nav aria-label="Library navigation" className="space-y-0.5">
              {libraryNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "notesvault-shell-nav-item flex min-h-9 items-center gap-3 px-3 text-sm font-medium transition-[background-color,color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
                        isActive
                          ? "bg-secondary text-foreground shadow-[inset_3px_0_0_var(--primary)]"
                          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                      )
                    }
                    key={item.label}
                    onClick={onClose}
                    to={item.to}
                  >
                    <Icon
                      aria-hidden="true"
                      className="notesvault-shell-nav-icon size-4 shrink-0"
                      strokeWidth={1.8}
                    />

                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <SidebarAccountSection onNavigate={onClose} />
        </div>
      </aside>
    </div>
  );
}
