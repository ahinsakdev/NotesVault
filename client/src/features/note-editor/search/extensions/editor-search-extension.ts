import { Extension } from "@tiptap/core";

import { editorSearchPlugin } from "../plugins/editor-search-plugin";

export const EditorSearchExtension = Extension.create({
  name: "editorSearch",

  addProseMirrorPlugins() {
    return [editorSearchPlugin];
  },
});
