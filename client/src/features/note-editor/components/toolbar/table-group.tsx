import type { Editor } from "@tiptap/react";

import { EditorTableActions } from "../table/editor-table-actions";

type TableGroupProps = {
  editor: Editor;
};

export function TableGroup({ editor }: TableGroupProps) {
  return <EditorTableActions editor={editor} />;
}
