import type { Editor } from "@tiptap/react";
import { Link2, Link2Off } from "lucide-react";
import { useState } from "react";

import { EditorLinkDialog } from "../link/editor-link-dialog";
import { EditorToolbarButton } from "./editor-toolbar-button";

type LinkGroupProps = {
  editor: Editor;
};

export function LinkGroup({ editor }: LinkGroupProps) {
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
      <EditorToolbarButton
        icon={<Link2 aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("link")}
        label="Add or edit link"
        onClick={handleOpenLinkDialog}
      />

      <EditorToolbarButton
        disabled={!editor.isActive("link")}
        icon={<Link2Off aria-hidden="true" className="size-3.5" />}
        label="Remove link"
        onClick={handleRemoveLink}
      />

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
