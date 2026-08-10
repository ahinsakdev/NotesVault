import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { CodeBlockView } from "../../components/code/code-block-view";
import { editorLowlight } from "./code-languages";

const NotesVaultCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockView);
  },
});

export const codeEditorExtensions = [
  NotesVaultCodeBlock.configure({
    lowlight: editorLowlight,
    enableTabIndentation: true,
    tabSize: 2,
    defaultLanguage: "plaintext",
    languageClassPrefix: "language-",

    HTMLAttributes: {
      class: "notesvault-code-block",
    },
  }),
];
