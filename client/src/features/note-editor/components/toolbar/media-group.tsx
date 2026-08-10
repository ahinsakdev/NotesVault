import type { Editor } from "@tiptap/react";
import { Link2 } from "lucide-react";
import { useState } from "react";

import { ImageFileInput } from "../image/image-file-input";
import { ImageUrlDialog } from "../image/image-url-dialog";
import { EditorToolbarButton } from "./editor-toolbar-button";

type MediaGroupProps = {
  editor: Editor;
};

export function MediaGroup({ editor }: MediaGroupProps) {
  const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);

  return (
    <>
      <ImageFileInput editor={editor} />

      <EditorToolbarButton
        icon={<Link2 aria-hidden="true" className="size-3.5" />}
        label="Insert image from URL"
        onClick={() => setIsUrlDialogOpen(true)}
      />

      <ImageUrlDialog
        isOpen={isUrlDialogOpen}
        onClose={() => setIsUrlDialogOpen(false)}
        onInsert={({ alt, src }) => {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "image",
              attrs: {
                align: "center",
                alt,
                caption: "",
                src,
                title: null,
                width: 80,
              },
            })
            .run();
        }}
      />
    </>
  );
}
