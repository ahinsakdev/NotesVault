import { NotebookPen } from "lucide-react";
import { Link } from "react-router";

import { ROUTES } from "@/app/routes";
import { cn } from "@/utils/cn";

type AuthLogoProps = {
  className?: string;
};

export function AuthLogo({ className }: AuthLogoProps) {
  return (
    <Link
      aria-label="NotesVault home"
      className={cn("flex w-full flex-col items-center text-center", className)}
      to={ROUTES.home}
    >
      <div className="flex items-center gap-3">
        <NotebookPen
          aria-hidden="true"
          className="size-5 text-primary"
          strokeWidth={1.8}
        />

        <span className="text-[1.85rem] font-semibold tracking-[-0.05em] text-foreground sm:text-[2rem]">
          NotesVault
        </span>
      </div>

      <div className="group/workspace mt-4 flex w-full cursor-default items-center gap-3 sm:gap-4">
        <span className="h-px flex-1 bg-border-strong transition-all duration-[var(--motion-slow)] group-hover/workspace:bg-primary group-hover/workspace:shadow-[0_0_12px_var(--primary)]" />

        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          KNOWLEDGE WORKSPACE
        </span>

        <span className="h-px flex-1 bg-border-strong transition-all duration-[var(--motion-slow)] group-hover/workspace:bg-primary group-hover/workspace:shadow-[0_0_12px_var(--primary)]" />
      </div>

      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        A HOME FOR YOUR IDEAS AND KNOWLEDGE
      </p>
    </Link>
  );
}
