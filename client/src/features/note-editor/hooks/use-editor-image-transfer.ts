import type { Editor } from "@tiptap/react";
import { useCallback, useRef, useState, type DragEvent } from "react";

import { useToast } from "@/hooks/use-toast";

import { insertImageFile } from "../utils/insert-image-file";

type UseEditorImageTransferOptions = {
  editor: Editor | null;
};

function getImageFiles(dataTransfer: DataTransfer): File[] {
  return Array.from(dataTransfer.files).filter((file) =>
    file.type.startsWith("image/"),
  );
}

export function useEditorImageTransfer({
  editor,
}: UseEditorImageTransferOptions) {
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  const dragDepthRef = useRef(0);

  const { showToast } = useToast();

  const insertTransferredImage = useCallback(
    async (file: File, position?: number) => {
      if (!editor) {
        return;
      }

      try {
        await insertImageFile({
          editor,
          file,
          position,
        });
      } catch (error) {
        showToast({
          message:
            error instanceof Error
              ? error.message
              : "Unable to insert the image.",
          title: "Image insert failed",
          variant: "error",
        });
      }
    },
    [editor, showToast],
  );

  const handleDragEnter = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (!editor?.isEditable) {
        return;
      }

      const imageFiles = getImageFiles(event.dataTransfer);

      if (imageFiles.length === 0) {
        return;
      }

      event.preventDefault();

      dragDepthRef.current += 1;

      setIsDraggingImage(true);
    },
    [editor],
  );

  const handleDragLeave = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (!editor?.isEditable) {
        return;
      }

      const imageFiles = getImageFiles(event.dataTransfer);

      if (imageFiles.length === 0 && !isDraggingImage) {
        return;
      }

      event.preventDefault();

      dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);

      if (dragDepthRef.current === 0) {
        setIsDraggingImage(false);
      }
    },
    [editor, isDraggingImage],
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (!editor?.isEditable) {
        return;
      }

      const imageFiles = getImageFiles(event.dataTransfer);

      if (imageFiles.length === 0) {
        return;
      }

      event.preventDefault();

      event.dataTransfer.dropEffect = "copy";
    },
    [editor],
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (!editor?.isEditable) {
        return;
      }

      const imageFiles = getImageFiles(event.dataTransfer);

      if (imageFiles.length === 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      dragDepthRef.current = 0;
      setIsDraggingImage(false);

      const coordinates = editor.view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      });

      const position = coordinates?.pos;

      void Promise.all(
        imageFiles.map((file, index) =>
          insertTransferredImage(
            file,
            position === undefined ? undefined : position + index,
          ),
        ),
      );
    },
    [editor, insertTransferredImage],
  );

  return {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDraggingImage,
  };
}
