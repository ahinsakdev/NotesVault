import { ImagePlus, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useDialogFocus } from "@/hooks/use-dialog-focus";

type ImageUrlDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (value: { alt: string; src: string }) => void;
};

export function ImageUrlDialog({
  isOpen,
  onClose,
  onInsert,
}: ImageUrlDialogProps) {
  const [alt, setAlt] = useState("");
  const [src, setSrc] = useState("");
  const [error, setError] = useState("");

  const dialogRef = useRef<HTMLFormElement | null>(null);
  const srcInputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = useCallback(() => {
    setAlt("");
    setSrc("");
    setError("");
    onClose();
  }, [onClose]);

  useDialogFocus({
    containerRef: dialogRef,
    initialFocusRef: srcInputRef,
    isOpen,
    onEscape: handleClose,
  });

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedSrc = src.trim();

    try {
      const url = new URL(normalizedSrc);

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error();
      }
    } catch {
      setError("Enter a valid HTTP or HTTPS image URL.");
      return;
    }

    onInsert({
      alt: alt.trim() || "Inserted image",
      src: normalizedSrc,
    });

    handleClose();
  }

  return createPortal(
    <div
      aria-label="Insert image from URL"
      aria-modal="true"
      className="notesvault-image-url-dialog"
      role="dialog"
    >
      <button
        aria-label="Close image URL dialog"
        className="notesvault-image-url-backdrop"
        onClick={handleClose}
        type="button"
      />

      <form
        className="notesvault-image-url-panel"
        onSubmit={handleSubmit}
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className="flex h-12 items-center gap-2 border-b border-border bg-surface-subtle px-4">
          <ImagePlus
            aria-hidden="true"
            className="size-3.5 text-muted-foreground"
          />

          <div>
            <h2 className="text-xs font-semibold text-foreground">
              Insert image from URL
            </h2>

            <p className="text-[9px] text-muted-foreground">
              Add a remotely hosted image
            </p>
          </div>

          <button
            aria-label="Close dialog"
            className="ml-auto flex size-8 items-center justify-center text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={handleClose}
            type="button"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </header>

        <div className="space-y-4 p-4">
          <label className="block">
            <span className="text-[10px] font-medium text-muted-foreground">
              Image URL
            </span>

            <input
              className="mt-1.5 h-9 w-full border border-input bg-background px-3 text-xs text-foreground outline-none transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] focus:border-ring focus:ring-2 focus:ring-ring/20"
              onChange={(event) => {
                setSrc(event.target.value);
                setError("");
              }}
              placeholder="https://example.com/image.png"
              ref={srcInputRef}
              type="url"
              value={src}
            />
          </label>

          <label className="block">
            <span className="text-[10px] font-medium text-muted-foreground">
              Alternative text
            </span>

            <input
              className="mt-1.5 h-9 w-full border border-input bg-background px-3 text-xs text-foreground outline-none transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] focus:border-ring focus:ring-2 focus:ring-ring/20"
              onChange={(event) => setAlt(event.target.value)}
              placeholder="Describe the image"
              type="text"
              value={alt}
            />
          </label>

          {error ? (
            <p className="text-[10px] text-danger" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <footer className="flex justify-end gap-2 border-t border-border bg-surface-subtle px-4 py-3">
          <button
            className="h-8 border border-border bg-background px-3 text-[10px] font-medium text-muted-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-secondary hover:text-foreground"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </button>

          <button
            className="h-8 bg-primary px-3 text-[10px] font-medium text-primary-foreground transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] hover:bg-primary-hover"
            type="submit"
          >
            Insert image
          </button>
        </footer>
      </form>
    </div>,
    document.body,
  );
}
