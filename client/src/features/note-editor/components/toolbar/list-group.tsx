import type { Editor } from "@tiptap/react";
import { List, ListOrdered, Quote } from "lucide-react";

import { EditorToolbarButton } from "./editor-toolbar-button";

type ListGroupProps = {
  editor: Editor;
};

export function ListGroup({ editor }: ListGroupProps) {
  return (
    <>
      <EditorToolbarButton
        icon={<List aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("bulletList")}
        label="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />

      <EditorToolbarButton
        icon={<ListOrdered aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("orderedList")}
        label="Numbered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />

      <EditorToolbarButton
        icon={<Quote aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("blockquote")}
        label="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
    </>
  );
}
