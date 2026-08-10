import { AlertTriangle, X } from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

type ConfirmDialogProps = {
  cancelLabel?: string;
  confirmLabel?: string;
  description: string;
  isOpen: boolean;
  title: string;
  variant?: "default" | "danger";
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  description,
  isOpen,
  title,
  variant = "default",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  useDialogFocus({
    containerRef: dialogRef,
    initialFocusRef: cancelButtonRef,
    isOpen,
    onEscape: onCancel,
  });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      aria-describedby="confirm-dialog-description"
      aria-labelledby="confirm-dialog-title"
      aria-modal="true"
      className="notesvault-overlay-backdrop fixed inset-0 z-[110] flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-[2px]"
      role="alertdialog"
    >
      <div
        className="notesvault-overlay-panel w-full max-w-md border border-border bg-card shadow-dialog"
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className="flex items-start gap-3 border-b border-border px-5 py-4">
          <div
            className={
              variant === "danger"
                ? "flex size-9 shrink-0 items-center justify-center bg-danger-subtle text-danger"
                : "flex size-9 shrink-0 items-center justify-center bg-surface-subtle text-primary"
            }
          >
            <AlertTriangle
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              className="text-sm font-semibold text-foreground"
              id="confirm-dialog-title"
            >
              {title}
            </h2>

            <p
              className="mt-1 text-xs leading-5 text-muted-foreground"
              id="confirm-dialog-description"
            >
              {description}
            </p>
          </div>

          <button
            aria-label="Close confirmation dialog"
            className="flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={onCancel}
            type="button"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </header>

        <footer className="flex items-center justify-end gap-2 px-5 py-4">
          <button
            className="inline-flex min-h-8 items-center justify-center border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={onCancel}
            ref={cancelButtonRef}
            type="button"
          >
            {cancelLabel}
          </button>

          <Button
            onClick={onConfirm}
            size="sm"
            variant={variant === "danger" ? "danger" : "primary"}
          >
            {confirmLabel}
          </Button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
