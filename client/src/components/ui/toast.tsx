import { Check, Info, X, XCircle } from "lucide-react";

import { cn } from "@/utils/cn";

export type ToastVariant = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  message: string;
  title?: string;
  variant: ToastVariant;
};

type ToastProps = ToastItem & {
  onDismiss: (id: string) => void;
};

const toastIcons = {
  success: Check,
  error: XCircle,
  info: Info,
} satisfies Record<ToastVariant, typeof Check>;

export function Toast({ id, message, title, variant, onDismiss }: ToastProps) {
  const Icon = toastIcons[variant];

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-start gap-3 border bg-card px-4 py-3 shadow-card",
        variant === "error" ? "border-danger/30" : "border-border",
      )}
      role={variant === "error" ? "alert" : "status"}
    >
      <div
        className={cn(
          "mt-0.5 flex size-7 shrink-0 items-center justify-center bg-surface-subtle",
          variant === "success" && "text-success",
          variant === "error" && "text-danger",
          variant === "info" && "text-primary",
        )}
      >
        <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        {title ? (
          <p className="text-xs font-semibold text-foreground">{title}</p>
        ) : null}

        <p
          className={cn(
            "text-[11px] leading-5 text-muted-foreground",
            title && "mt-0.5",
          )}
        >
          {message}
        </p>
      </div>

      <button
        aria-label="Dismiss notification"
        className="notesvault-focus-ring flex size-7 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        onClick={() => onDismiss(id)}
        type="button"
      >
        <X aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  );
}
