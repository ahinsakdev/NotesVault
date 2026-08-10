import type { Editor } from "@tiptap/react";
import {
  Bold,
  Highlighter,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";

import { EditorToolbarButton } from "./editor-toolbar-button";

type FormattingGroupProps = {
  editor: Editor;
};

export function FormattingGroup({ editor }: FormattingGroupProps) {
  return (
    <>
      <EditorToolbarButton
        icon={<Bold aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("bold")}
        label="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
      />

      <EditorToolbarButton
        icon={<Italic aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("italic")}
        label="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />

      <EditorToolbarButton
        icon={<Underline aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("underline")}
        label="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />

      <EditorToolbarButton
        icon={<Strikethrough aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("strike")}
        label="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />

      <EditorToolbarButton
        icon={<Highlighter aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("highlight")}
        label="Highlight"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      />
    </>
  );
}
