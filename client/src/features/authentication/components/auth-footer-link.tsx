import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router";

type AuthFooterLinkProps = {
  label?: string;
  linkLabel: string;
  to: string;
  direction?: "left" | "right";
};

export function AuthFooterLink({
  direction = "right",
  label,
  linkLabel,
  to,
}: AuthFooterLinkProps) {
  const Icon: LucideIcon = direction === "left" ? ArrowLeft : ArrowRight;

  return (
    <div className="flex items-center justify-center gap-1.5">
      {label ? <span>{label}</span> : null}

      <Link
        className="group inline-flex items-center gap-1 font-medium text-primary transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:text-primary-hover"
        to={to}
      >
        {direction === "left" ? (
          <Icon
            aria-hidden="true"
            className="size-3.5 transition-transform duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] group-hover:-translate-x-0.5"
          />
        ) : null}

        {linkLabel}

        {direction === "right" ? (
          <Icon
            aria-hidden="true"
            className="size-3.5 transition-transform duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] group-hover:translate-x-0.5"
          />
        ) : null}
      </Link>
    </div>
  );
}
