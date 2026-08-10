import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

import { cn } from "@/utils/cn";

type SharedProfileMenuItemProps = {
  className?: string;
  description?: string;
  icon: LucideIcon;
  label: string;
  trailing?: ReactNode;
};

type ProfileMenuLinkItemProps = SharedProfileMenuItemProps & {
  onClick?: never;
  to: string;
};

type ProfileMenuButtonItemProps = SharedProfileMenuItemProps & {
  onClick: () => void;
  to?: never;
};

type ProfileMenuItemProps =
  | ProfileMenuLinkItemProps
  | ProfileMenuButtonItemProps;

export function ProfileMenuItem({
  className,
  description,
  icon: Icon,
  label,
  onClick,
  to,
  trailing,
}: ProfileMenuItemProps) {
  const content = (
    <>
      <Icon
        aria-hidden="true"
        className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-[color,transform] duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] group-hover/profile-item:translate-x-px group-hover/profile-item:text-foreground"
      />

      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium text-foreground">
          {label}
        </span>

        {description ? (
          <span className="mt-0.5 block text-[9px] leading-4 text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>

      {trailing ? (
        <span className="shrink-0 text-[9px] text-muted-foreground">
          {trailing}
        </span>
      ) : null}
    </>
  );

  const classes = cn(
    "group/profile-item flex w-full items-start gap-3 px-3 py-2.5 text-left transition-[background-color,color] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
    className,
  );

  if (to) {
    return (
      <Link className={classes} role="menuitem" tabIndex={-1} to={to}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      role="menuitem"
      tabIndex={-1}
      type="button"
    >
      {content}
    </button>
  );
}
