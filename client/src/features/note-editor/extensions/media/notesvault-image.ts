import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { ImageNodeView } from "../../components/image/image-node-view";

const MIN_IMAGE_WIDTH = 30;
const MAX_IMAGE_WIDTH = 100;
const DEFAULT_IMAGE_WIDTH = 80;

function normalizeImageWidth(value: unknown): number {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return DEFAULT_IMAGE_WIDTH;
  }

  return Math.min(
    MAX_IMAGE_WIDTH,
    Math.max(MIN_IMAGE_WIDTH, Math.round(numericValue)),
  );
}

export const NotesVaultImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") ?? "center",
        renderHTML: (attributes) => ({
          "data-align": attributes.align,
        }),
      },

      caption: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-caption") ?? "",
        renderHTML: (attributes) => ({
          "data-caption": attributes.caption,
        }),
      },

      width: {
        default: DEFAULT_IMAGE_WIDTH,
        parseHTML: (element) =>
          normalizeImageWidth(element.getAttribute("data-width")),
        renderHTML: (attributes) => ({
          "data-width": normalizeImageWidth(attributes.width),
        }),
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
}).configure({
  allowBase64: true,
  inline: false,

  HTMLAttributes: {
    class: "notesvault-image",
  },
});
