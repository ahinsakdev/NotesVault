import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type EditorToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
};

export function EditorToolbarButton({
  className,
  icon,
  isActive = false,
  label,
  ...props
}: EditorToolbarButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={isActive}
      className={cn(
        "notesvault-focus-ring flex size-8 shrink-0 items-center justify-center transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)]",
        isActive
          ? "bg-secondary text-foreground shadow-[inset_0_-2px_0_var(--primary)]"
          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      title={label}
      type="button"
      {...props}
    >
      {icon}
    </button>
  );
}
