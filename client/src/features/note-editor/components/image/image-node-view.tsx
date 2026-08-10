import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Download,
  Expand,
  ImageIcon,
  ImageUp,
  LoaderCircle,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useRef, useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/utils/cn";

import type {
  ImageAlignment,
  NotesVaultImageAttributes,
} from "../../extensions/media/image.types";
import { imageUploadAdapter } from "../../services/image-upload.service";
import { downloadImage } from "../../utils/image-file.utils";
import { ImagePreviewDialog } from "./image-preview-dialog";

const widthPresets = [40, 60, 80, 100] as const;

const MIN_IMAGE_WIDTH = 30;
const MAX_IMAGE_WIDTH = 100;

function clampWidth(width: number): number {
  return Math.min(
    MAX_IMAGE_WIDTH,
    Math.max(MIN_IMAGE_WIDTH, Math.round(width)),
  );
}

export function ImageNodeView({
  deleteNode,
  editor,
  node,
  selected,
  updateAttributes,
}: NodeViewProps) {
  const replaceInputRef = useRef<HTMLInputElement | null>(null);
  const resizeCleanupRef = useRef<(() => void) | null>(null);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { showToast } = useToast();

  const attributes = node.attrs as NotesVaultImageAttributes;

  const isEditable = editor.isEditable;

  function updateAlignment(align: ImageAlignment) {
    updateAttributes({ align });
  }

  async function handleReplacement(file: File) {
    setIsReplacing(true);

    try {
      const image = await imageUploadAdapter(file);

      updateAttributes({
        alt: image.alt,
        src: image.src,
        title: image.title,
      });

      showToast({
        message: "The image was replaced successfully.",
        title: "Image replaced",
        variant: "success",
      });
    } catch (error) {
      showToast({
        message:
          error instanceof Error
            ? error.message
            : "Unable to replace the image.",
        title: "Image replacement failed",
        variant: "error",
      });
    } finally {
      setIsReplacing(false);

      if (replaceInputRef.current) {
        replaceInputRef.current.value = "";
      }
    }
  }

  function handleResizeStart(event: React.PointerEvent<HTMLButtonElement>) {
    if (!isEditable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    resizeCleanupRef.current?.();

    const figure = event.currentTarget.closest(".notesvault-image-figure");

    const wrapper = event.currentTarget.closest(".notesvault-image-node");

    if (!(figure instanceof HTMLElement) || !(wrapper instanceof HTMLElement)) {
      return;
    }

    const startPointerX = event.clientX;
    const startWidth = figure.offsetWidth;
    const availableWidth = wrapper.clientWidth;

    if (availableWidth <= 0) {
      return;
    }

    document.body.classList.add("notesvault-image-is-resizing");

    function handlePointerMove(pointerEvent: PointerEvent) {
      const widthDifference = pointerEvent.clientX - startPointerX;

      const nextWidth = ((startWidth + widthDifference) / availableWidth) * 100;

      updateAttributes({
        width: clampWidth(nextWidth),
      });
    }

    function cleanup() {
      document.body.classList.remove("notesvault-image-is-resizing");

      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", handlePointerUp);

      window.removeEventListener("pointercancel", handlePointerUp);

      resizeCleanupRef.current = null;
    }

    function handlePointerUp() {
      cleanup();
    }

    resizeCleanupRef.current = cleanup;

    window.addEventListener("pointermove", handlePointerMove);

    window.addEventListener("pointerup", handlePointerUp);

    window.addEventListener("pointercancel", handlePointerUp);
  }

  return (
    <>
      <NodeViewWrapper
        className={cn(
          "notesvault-image-node",
          selected && isEditable && "is-selected",
        )}
        data-align={attributes.align}
        data-width={attributes.width}
      >
        <figure
          className="notesvault-image-figure"
          style={{
            width: `${attributes.width}%`,
          }}
        >
          {isEditable ? (
            <div className="notesvault-image-toolbar" contentEditable={false}>
              <span className="notesvault-image-toolbar-label">
                <ImageIcon aria-hidden="true" className="size-3" />
                Image
              </span>

              <div className="notesvault-image-toolbar-actions">
                <button
                  aria-label="Align image left"
                  aria-pressed={attributes.align === "left"}
                  className="notesvault-image-action"
                  onClick={() => updateAlignment("left")}
                  title="Align left"
                  type="button"
                >
                  <AlignLeft aria-hidden="true" className="size-3" />
                </button>

                <button
                  aria-label="Align image center"
                  aria-pressed={attributes.align === "center"}
                  className="notesvault-image-action"
                  onClick={() => updateAlignment("center")}
                  title="Align center"
                  type="button"
                >
                  <AlignCenter aria-hidden="true" className="size-3" />
                </button>

                <button
                  aria-label="Align image right"
                  aria-pressed={attributes.align === "right"}
                  className="notesvault-image-action"
                  onClick={() => updateAlignment("right")}
                  title="Align right"
                  type="button"
                >
                  <AlignRight aria-hidden="true" className="size-3" />
                </button>

                <button
                  aria-label="Replace image"
                  className="notesvault-image-action"
                  disabled={isReplacing}
                  onClick={() => replaceInputRef.current?.click()}
                  title="Replace image"
                  type="button"
                >
                  {isReplacing ? (
                    <LoaderCircle
                      aria-hidden="true"
                      className="size-3 animate-spin"
                    />
                  ) : (
                    <ImageUp aria-hidden="true" className="size-3" />
                  )}
                </button>

                <button
                  aria-label="Preview image"
                  className="notesvault-image-action"
                  onClick={() => setIsPreviewOpen(true)}
                  title="Preview image"
                  type="button"
                >
                  <Expand aria-hidden="true" className="size-3" />
                </button>

                <button
                  aria-label="Download image"
                  className="notesvault-image-action"
                  onClick={() => downloadImage(attributes.src, attributes.alt)}
                  title="Download image"
                  type="button"
                >
                  <Download aria-hidden="true" className="size-3" />
                </button>

                <button
                  aria-label="Remove image"
                  className="notesvault-image-action notesvault-image-action--danger"
                  onClick={deleteNode}
                  title="Remove image"
                  type="button"
                >
                  <Trash2 aria-hidden="true" className="size-3" />
                </button>
              </div>
            </div>
          ) : null}

          <button
            aria-label="Open full-screen image preview"
            className="notesvault-image-preview-trigger"
            onClick={() => setIsPreviewOpen(true)}
            type="button"
          >
            <img
              alt={attributes.alt}
              className={cn(
                "notesvault-image-element",
                !isImageLoaded && "notesvault-image-element--loading",
              )}
              draggable={false}
              onError={() => {
                setHasImageError(true);
                setIsImageLoaded(false);
              }}
              onLoad={() => {
                setHasImageError(false);
                setIsImageLoaded(true);
              }}
              src={attributes.src}
              title={attributes.title ?? undefined}
            />

            {hasImageError ? (
              <div className="notesvault-image-error">
                <AlertTriangle aria-hidden="true" className="size-4" />

                <div>
                  <p className="text-xs font-medium text-foreground">
                    Image unavailable
                  </p>

                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    The image could not be loaded.
                  </p>
                </div>
              </div>
            ) : null}

            {!isEditable ? (
              <span
                aria-hidden="true"
                className="notesvault-image-preview-indicator"
              >
                <Expand className="size-3.5" />
              </span>
            ) : null}
          </button>

          {isEditable ? (
            <>
              <button
                aria-label="Resize image"
                className="notesvault-image-resize-handle"
                contentEditable={false}
                onPointerDown={handleResizeStart}
                title="Drag to resize image"
                type="button"
              />

              <div
                className="notesvault-image-controls"
                contentEditable={false}
              >
                <div className="notesvault-image-widths">
                  {widthPresets.map((width) => (
                    <button
                      aria-label={`Set image width to ${width}%`}
                      aria-pressed={attributes.width === width}
                      className="notesvault-image-width"
                      key={width}
                      onClick={() => updateAttributes({ width })}
                      type="button"
                    >
                      {width}%
                    </button>
                  ))}

                  <span className="notesvault-image-current-width">
                    {Math.round(attributes.width)}%
                  </span>
                </div>

                <input
                  aria-label="Image alternative text"
                  className="notesvault-image-alt-input"
                  onChange={(event) =>
                    updateAttributes({
                      alt: event.target.value,
                    })
                  }
                  placeholder="Describe this image for accessibility..."
                  type="text"
                  value={attributes.alt}
                />

                <input
                  aria-label="Image caption"
                  className="notesvault-image-caption-input"
                  onChange={(event) =>
                    updateAttributes({
                      caption: event.target.value,
                    })
                  }
                  placeholder="Write a caption..."
                  type="text"
                  value={attributes.caption}
                />
              </div>
            </>
          ) : attributes.caption ? (
            <figcaption className="notesvault-image-caption">
              {attributes.caption}
            </figcaption>
          ) : null}

          <input
            accept="image/gif,image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                void handleReplacement(file);
              }
            }}
            ref={replaceInputRef}
            type="file"
          />
        </figure>
      </NodeViewWrapper>

      <ImagePreviewDialog
        alt={attributes.alt}
        caption={attributes.caption}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        src={attributes.src}
      />
    </>
  );
}
