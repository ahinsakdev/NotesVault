import { X } from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";

import { useDialogFocus } from "@/hooks/use-dialog-focus";

type ImagePreviewDialogProps = {
  alt: string;
  caption: string;
  isOpen: boolean;
  onClose: () => void;
  src: string;
};

export function ImagePreviewDialog({
  alt,
  caption,
  isOpen,
  onClose,
  src,
}: ImagePreviewDialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useDialogFocus({
    containerRef: dialogRef,
    initialFocusRef: closeButtonRef,
    isOpen,
    onEscape: onClose,
  });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      aria-label="Image preview"
      aria-modal="true"
      className="notesvault-image-preview"
      role="dialog"
    >
      <button
        aria-label="Close image preview"
        className="notesvault-image-preview-backdrop"
        onClick={onClose}
        type="button"
      />

      <div
        className="notesvault-image-preview-content"
        ref={dialogRef}
        tabIndex={-1}
      >
        <button
          aria-label="Close image preview"
          className="notesvault-image-preview-close"
          onClick={onClose}
          ref={closeButtonRef}
          title="Close preview"
          type="button"
        >
          <X aria-hidden="true" className="size-4" />
        </button>

        <img alt={alt} className="notesvault-image-preview-element" src={src} />

        {caption ? (
          <p className="notesvault-image-preview-caption">{caption}</p>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
