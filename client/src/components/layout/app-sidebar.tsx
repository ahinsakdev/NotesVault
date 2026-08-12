import {
  Archive,
  FileText,
  Folder,
  History,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Pin,
  Plus,
  Search,
  Star,
  Tags,
  Trash2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

import { SidebarAccountSection } from "./sidebar-account-section";

type AppSidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
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

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const navigate = useNavigate();

  function handleCreateNote() {
    navigate(ROUTES.noteDetails.replace(":noteId", "new"));
  }

  return (
    <aside
      className={cn(
        "hidden h-screen shrink-0 flex-col overflow-hidden border-r border-border bg-surface-subtle transition-[width] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] lg:flex",
        isCollapsed ? "w-18" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex h-13 shrink-0 items-center border-b border-border",
          isCollapsed ? "justify-center px-3" : "justify-between px-4",
        )}
      >
        {isCollapsed ? (
          <FileText
            aria-label="NotesVault"
            className="size-5 text-primary"
            strokeWidth={1.8}
          />
        ) : (
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
        )}

        {!isCollapsed ? (
          <button
            aria-label="Collapse sidebar"
            className="notesvault-focus-ring flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-[background-color,color] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary/70 hover:text-foreground"
            onClick={onToggle}
            type="button"
          >
            <PanelLeftClose aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-3 py-3">
        <div className="min-h-0 flex-1 overflow-hidden">
          {isCollapsed ? (
            <div className="mb-3 space-y-1.5">
              <button
                aria-label="Expand sidebar"
                className="notesvault-focus-ring flex size-9 items-center justify-center border border-border bg-card text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary/70 hover:text-foreground"
                onClick={onToggle}
                title="Expand sidebar"
                type="button"
              >
                <PanelLeftOpen aria-hidden="true" className="size-4" />
              </button>

              <button
                aria-label="Create new note"
                className="notesvault-focus-ring flex size-9 items-center justify-center bg-primary text-primary-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-primary-hover"
                onClick={handleCreateNote}
                title="New note"
                type="button"
              >
                <Plus aria-hidden="true" className="size-4" />
              </button>
            </div>
          ) : (
            <Button
              className="mb-4 w-full"
              leftIcon={<Plus className="size-4" />}
              onClick={handleCreateNote}
              size="sm"
            >
              New note
            </Button>
          )}

          <nav aria-label="Primary navigation" className="space-y-0.5">
            {primaryNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  aria-label={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    cn(
                      "notesvault-shell-nav-item flex min-h-9 items-center text-sm font-medium transition-[background-color,color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
                      isCollapsed ? "justify-center px-2" : "gap-3 px-3",
                      isActive
                        ? "bg-secondary text-foreground shadow-[inset_3px_0_0_var(--primary)]"
                        : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                    )
                  }
                  end={item.to === ROUTES.notes}
                  key={item.label}
                  title={isCollapsed ? item.label : undefined}
                  to={item.to}
                >
                  <Icon
                    aria-hidden="true"
                    className="notesvault-shell-nav-icon size-4 shrink-0"
                    strokeWidth={1.8}
                  />

                  {!isCollapsed ? <span>{item.label}</span> : null}
                </NavLink>
              );
            })}
          </nav>

          <div className="my-3 border-t border-border" />

          {!isCollapsed ? (
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Library
            </p>
          ) : null}

          <nav aria-label="Library navigation" className="space-y-0.5">
            {libraryNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  aria-label={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    cn(
                      "notesvault-shell-nav-item flex min-h-9 items-center text-sm font-medium transition-[background-color,color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
                      isCollapsed ? "justify-center px-2" : "gap-3 px-3",
                      isActive
                        ? "bg-secondary text-foreground shadow-[inset_3px_0_0_var(--primary)]"
                        : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                    )
                  }
                  key={item.label}
                  title={isCollapsed ? item.label : undefined}
                  to={item.to}
                >
                  <Icon
                    aria-hidden="true"
                    className="notesvault-shell-nav-icon size-4 shrink-0"
                    strokeWidth={1.8}
                  />

                  {!isCollapsed ? <span>{item.label}</span> : null}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <SidebarAccountSection isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
