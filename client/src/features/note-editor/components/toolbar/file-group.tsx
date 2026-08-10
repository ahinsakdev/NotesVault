import type { Editor } from "@tiptap/react";

import { EditorFileActions } from "../editor-file-actions";

type FileGroupProps = {
  editor: Editor;
  noteTitle: string;
  onImportedTitleChange: (title: string) => void;
};

export function FileGroup({
  editor,
  noteTitle,
  onImportedTitleChange,
}: FileGroupProps) {
  return (
    <EditorFileActions
      editor={editor}
      noteTitle={noteTitle}
      onImportedTitleChange={onImportedTitleChange}
    />
  );
}
