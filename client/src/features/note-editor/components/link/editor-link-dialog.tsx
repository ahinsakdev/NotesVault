import { Link2, X } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { useDialogFocus } from "@/hooks/use-dialog-focus";

type EditorLinkDialogProps = {
  initialUrl?: string;
  isOpen: boolean;
  onCancel: () => void;
  onRemove: () => void;
  onSubmit: (url: string) => void;
};

export function EditorLinkDialog({
  initialUrl = "",
  isOpen,
  onCancel,
  onRemove,
  onSubmit,
}: EditorLinkDialogProps) {
  const [url, setUrl] = useState(() => initialUrl);

  const dialogRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useDialogFocus({
    containerRef: dialogRef,
    initialFocusRef: inputRef,
    isOpen,
    onEscape: onCancel,
  });

  if (!isOpen) {
    return null;
  }

  const hasExistingLink = Boolean(initialUrl.trim());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextUrl = url.trim();

    if (!nextUrl) {
      onRemove();
      return;
    }

    onSubmit(nextUrl);
  }

  return createPortal(
    <div
      aria-labelledby="editor-link-dialog-title"
      aria-modal="true"
      className="notesvault-overlay-backdrop fixed inset-0 z-[110] flex items-center justify-center bg-black/35 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
      role="dialog"
    >
      <form
        className="notesvault-overlay-panel w-full max-w-md border border-border bg-card shadow-card"
        onSubmit={handleSubmit}
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className="flex items-start gap-3 border-b border-border px-5 py-4">
          <div className="flex size-9 shrink-0 items-center justify-center bg-surface-subtle text-primary">
            <Link2 aria-hidden="true" className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              className="text-sm font-semibold text-foreground"
              id="editor-link-dialog-title"
            >
              {hasExistingLink ? "Edit link" : "Add link"}
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Add a destination URL to the selected text.
            </p>
          </div>

          <button
            aria-label="Close link dialog"
            className="notesvault-focus-ring flex size-8 shrink-0 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={onCancel}
            type="button"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </header>

        <div className="px-5 py-5">
          <label
            className="text-[11px] font-medium text-foreground"
            htmlFor="editor-link-url"
          >
            URL
          </label>

          <input
            autoComplete="off"
            className="mt-2 h-10 w-full border border-input bg-background px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            id="editor-link-url"
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            ref={inputRef}
            type="url"
            value={url}
          />

          <p className="mt-2 text-[10px] leading-4 text-muted-foreground">
            Leave the URL empty to remove the current link.
          </p>
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-border px-5 py-4">
          <div>
            {hasExistingLink ? (
              <Button
                onClick={onRemove}
                size="sm"
                type="button"
                variant="ghost"
              >
                Remove link
              </Button>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={onCancel}
              size="sm"
              type="button"
              variant="outline"
            >
              Cancel
            </Button>

            <Button size="sm" type="submit">
              {hasExistingLink ? "Update link" : "Add link"}
            </Button>
          </div>
        </footer>
      </form>
    </div>,
    document.body,
  );
}
