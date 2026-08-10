import type { Editor } from "@tiptap/react";
import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";

import { useToast } from "@/hooks/use-toast";

import { insertImageFile } from "../../utils/insert-image-file";
import { EditorToolbarButton } from "../toolbar/editor-toolbar-button";

type ImageFileInputProps = {
  editor: Editor;
};

export function ImageFileInput({ editor }: ImageFileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isReading, setIsReading] = useState(false);

  const { showToast } = useToast();

  async function handleFile(file: File) {
    setIsReading(true);

    try {
      await insertImageFile({
        editor,
        file,
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
    } finally {
      setIsReading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <>
      <EditorToolbarButton
        disabled={isReading}
        icon={<ImagePlus aria-hidden="true" className="size-3.5" />}
        label={isReading ? "Adding image" : "Upload image"}
        onClick={() => inputRef.current?.click()}
      />

      <input
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            void handleFile(file);
          }
        }}
        ref={inputRef}
        type="file"
      />
    </>
  );
}
