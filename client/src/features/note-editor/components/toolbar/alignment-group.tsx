import type { Editor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

import { EditorToolbarButton } from "./editor-toolbar-button";

type AlignmentGroupProps = {
  editor: Editor;
};

export function AlignmentGroup({ editor }: AlignmentGroupProps) {
  return (
    <>
      <EditorToolbarButton
        icon={<AlignLeft aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive({ textAlign: "left" })}
        label="Align left"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      />

      <EditorToolbarButton
        icon={<AlignCenter aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive({ textAlign: "center" })}
        label="Align center"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      />

      <EditorToolbarButton
        icon={<AlignRight aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive({ textAlign: "right" })}
        label="Align right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      />

      <EditorToolbarButton
        icon={<AlignJustify aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive({ textAlign: "justify" })}
        label="Justify"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      />
    </>
  );
}
