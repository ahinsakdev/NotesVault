import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  Bold,
  Code,
  Highlighter,
  Italic,
  Link2,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useState } from "react";

import { EditorLinkDialog } from "./link/editor-link-dialog";
import { EditorToolbarButton } from "./toolbar/editor-toolbar-button";

type EditorBubbleMenuProps = {
  editor: Editor;
};

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [initialUrl, setInitialUrl] = useState("");

  function handleOpenLinkDialog() {
    const previousUrl = editor.getAttributes("link").href ?? "";

    setInitialUrl(previousUrl);
    setIsLinkDialogOpen(true);
  }

  function handleCloseLinkDialog() {
    setIsLinkDialogOpen(false);
  }

  function handleSetLink(url: string) {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();

    setIsLinkDialogOpen(false);
  }

  function handleRemoveLink() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

    setIsLinkDialogOpen(false);
  }

  return (
    <>
      <BubbleMenu
        editor={editor}
        options={{
          placement: "top",
          offset: 8,
        }}
        shouldShow={({ editor: currentEditor, from, to }) => {
          if (from === to) {
            return false;
          }

          if (
            currentEditor.isActive("codeBlock") ||
            currentEditor.isActive("image")
          ) {
            return false;
          }

          return currentEditor.isEditable;
        }}
      >
        <div className="notesvault-editor-bubble-menu flex items-center gap-0.5 border border-border bg-card p-1 shadow-card">
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

          <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-border" />

          <EditorToolbarButton
            icon={<Highlighter aria-hidden="true" className="size-3.5" />}
            isActive={editor.isActive("highlight")}
            label="Highlight"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHighlight({
                  color: "#fef08a",
                })
                .run()
            }
          />

          <EditorToolbarButton
            icon={<Code aria-hidden="true" className="size-3.5" />}
            isActive={editor.isActive("code")}
            label="Inline code"
            onClick={() => editor.chain().focus().toggleCode().run()}
          />

          <EditorToolbarButton
            icon={<Link2 aria-hidden="true" className="size-3.5" />}
            isActive={editor.isActive("link")}
            label="Add or edit link"
            onClick={handleOpenLinkDialog}
          />
        </div>
      </BubbleMenu>

      {isLinkDialogOpen ? (
        <EditorLinkDialog
          initialUrl={initialUrl}
          isOpen
          onCancel={handleCloseLinkDialog}
          onRemove={handleRemoveLink}
          onSubmit={handleSetLink}
        />
      ) : null}
    </>
  );
}
