import type { Editor } from "@tiptap/react";
import { Heading1, Heading2, Heading3 } from "lucide-react";

import { EditorToolbarButton } from "./editor-toolbar-button";

type TypographyGroupProps = {
  editor: Editor;
};

export function TypographyGroup({ editor }: TypographyGroupProps) {
  return (
    <>
      <EditorToolbarButton
        icon={<Heading1 aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("heading", { level: 1 })}
        label="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />

      <EditorToolbarButton
        icon={<Heading2 aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("heading", { level: 2 })}
        label="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />

      <EditorToolbarButton
        icon={<Heading3 aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("heading", { level: 3 })}
        label="Heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />
    </>
  );
}
