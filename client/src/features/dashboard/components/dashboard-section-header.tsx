import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

type DashboardSectionHeaderProps = {
  title: string;
  description?: string;
  linkLabel?: string;
  linkTo?: string;
};

export function DashboardSectionHeader({
  description,
  linkLabel,
  linkTo,
  title,
}: DashboardSectionHeaderProps) {
  return (
    <header className="mb-3 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold tracking-[-0.025em]">{title}</h2>

        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>

      {linkLabel && linkTo ? (
        <Link
          className="group inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-hover"
          to={linkTo}
        >
          {linkLabel}

          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-[var(--motion-standard)] group-hover:translate-x-0.5"
          />
        </Link>
      ) : null}
    </header>
  );
}
