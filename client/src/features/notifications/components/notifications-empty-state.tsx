import { BellOff } from "lucide-react";

export function NotificationsEmptyState() {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex size-10 items-center justify-center bg-surface-subtle text-muted-foreground">
        <BellOff aria-hidden="true" className="size-4" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-foreground">
        You’re all caught up
      </h3>

      <p className="mt-1 max-w-xs text-[11px] leading-5 text-muted-foreground">
        New workspace activity and important updates will appear here.
      </p>
    </div>
  );
}
