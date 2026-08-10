import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import { ProfileMenu } from "./profile-menu";
import type { ProfileMenuState } from "./profile-menu.types";

const profileState: ProfileMenuState = {
  status: "guest",
  user: null,
};

export function ProfileMenuTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const initials =
    profileState.status === "authenticated" ? profileState.user.initials : "AH";

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        className="flex h-8 min-w-12 items-center justify-between gap-1.5 bg-primary px-2 text-primary-foreground transition-[background-color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        ref={triggerRef}
        type="button"
      >
        <span className="text-[10px] font-semibold">{initials}</span>

        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 transition-transform duration-[var(--motion-standard)] ease-[var(--motion-ease-soft)] ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={1.8}
        />
      </button>

      <ProfileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        state={profileState}
        triggerRef={triggerRef}
      />
    </div>
  );
}
