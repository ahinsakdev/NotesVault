import type { Editor } from "@tiptap/react";
import { Minus, Pilcrow } from "lucide-react";

import { EditorToolbarButton } from "./editor-toolbar-button";

type InsertGroupProps = {
  editor: Editor;
};

export function InsertGroup({ editor }: InsertGroupProps) {
  return (
    <>
      <EditorToolbarButton
        icon={<Minus aria-hidden="true" className="size-3.5" />}
        label="Horizontal divider"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />

      <EditorToolbarButton
        icon={<Pilcrow aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("paragraph")}
        label="Paragraph"
        onClick={() => editor.chain().focus().setParagraph().run()}
      />
    </>
  );
}
