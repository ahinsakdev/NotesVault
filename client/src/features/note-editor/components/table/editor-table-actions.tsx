import type { Editor } from "@tiptap/react";
import {
  Columns3,
  Rows3,
  SplitSquareHorizontal,
  Table2,
  TableCellsMerge,
  TableProperties,
  Trash2,
} from "lucide-react";

import { EditorToolbarButton } from "../toolbar/editor-toolbar-button";

type EditorTableActionsProps = {
  editor: Editor;
};

export function EditorTableActions({ editor }: EditorTableActionsProps) {
  const isTableActive = editor.isActive("table");

  return (
    <>
      <EditorToolbarButton
        icon={<Table2 aria-hidden="true" className="size-3.5" />}
        label="Insert table"
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({
              rows: 3,
              cols: 3,
              withHeaderRow: true,
            })
            .run()
        }
      />

      <EditorToolbarButton
        disabled={!isTableActive}
        icon={<Rows3 aria-hidden="true" className="size-3.5" />}
        label="Add row below"
        onClick={() => editor.chain().focus().addRowAfter().run()}
      />

      <EditorToolbarButton
        disabled={!isTableActive}
        icon={<Columns3 aria-hidden="true" className="size-3.5" />}
        label="Add column after"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      />

      <EditorToolbarButton
        disabled={!isTableActive}
        icon={<SplitSquareHorizontal aria-hidden="true" className="size-3.5" />}
        label="Delete current row"
        onClick={() => editor.chain().focus().deleteRow().run()}
      />

      <EditorToolbarButton
        disabled={!isTableActive}
        icon={<Trash2 aria-hidden="true" className="size-3.5" />}
        label="Delete current column"
        onClick={() => editor.chain().focus().deleteColumn().run()}
      />

      <EditorToolbarButton
        disabled={!isTableActive}
        icon={<TableProperties aria-hidden="true" className="size-3.5" />}
        label="Toggle header row"
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
      />

      <EditorToolbarButton
        disabled={!isTableActive}
        icon={<TableCellsMerge aria-hidden="true" className="size-3.5" />}
        label="Merge or split cells"
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
      />

      <EditorToolbarButton
        disabled={!isTableActive}
        icon={<Trash2 aria-hidden="true" className="size-3.5" />}
        label="Delete table"
        onClick={() => editor.chain().focus().deleteTable().run()}
      />
    </>
  );
}
