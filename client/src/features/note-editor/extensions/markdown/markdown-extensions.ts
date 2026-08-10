import Link from "@tiptap/extension-link";
import { Markdown } from "@tiptap/markdown";

export const markdownEditorExtensions = [
  Link.configure({
    autolink: true,
    linkOnPaste: true,
    openOnClick: false,
    defaultProtocol: "https",
    HTMLAttributes: {
      class: "notesvault-editor-link",
      rel: "noopener noreferrer",
      target: "_blank",
    },
  }),

  Markdown.configure({
    indentation: {
      style: "space",
      size: 2,
    },
    markedOptions: {
      gfm: true,
      breaks: false,
      pedantic: false,
    },
  }),
];
