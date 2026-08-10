import type { Editor } from "@tiptap/react";

import { imageUploadAdapter } from "../services/image-upload.service";

type InsertImageFileOptions = {
  editor: Editor;
  file: File;
  position?: number;
};

export async function insertImageFile({
  editor,
  file,
  position,
}: InsertImageFileOptions): Promise<void> {
  const image = await imageUploadAdapter(file);

  const imageNode = {
    type: "image",
    attrs: {
      align: "center",
      alt: image.alt,
      caption: "",
      src: image.src,
      title: image.title,
      width: 80,
    },
  };

  if (typeof position === "number") {
    editor.chain().focus().insertContentAt(position, imageNode).run();

    return;
  }

  editor.chain().focus().insertContent(imageNode).run();
}
