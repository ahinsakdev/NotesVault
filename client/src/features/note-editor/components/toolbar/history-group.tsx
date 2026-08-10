import { useEditorState, type Editor } from "@tiptap/react";
import { Redo2, Undo2 } from "lucide-react";

import { EditorToolbarButton } from "./editor-toolbar-button";

type HistoryGroupProps = {
  editor: Editor | null;
};

type HistoryState = {
  canRedo: boolean;
  canUndo: boolean;
};

const EMPTY_HISTORY_STATE: HistoryState = {
  canRedo: false,
  canUndo: false,
};

export function HistoryGroup({ editor }: HistoryGroupProps) {
  const historyState = useEditorState({
    editor,

    selector: ({ editor: currentEditor }): HistoryState => {
      if (!currentEditor || currentEditor.isDestroyed) {
        return EMPTY_HISTORY_STATE;
      }

      const commands = currentEditor.can();

      return {
        canRedo: commands.chain().focus().redo().run(),
        canUndo: commands.chain().focus().undo().run(),
      };
    },
  });

  const canRedo = historyState?.canRedo ?? false;
  const canUndo = historyState?.canUndo ?? false;

  function handleUndo() {
    if (!editor || editor.isDestroyed) {
      return;
    }

    editor.chain().focus().undo().run();
  }

  function handleRedo() {
    if (!editor || editor.isDestroyed) {
      return;
    }

    editor.chain().focus().redo().run();
  }

  return (
    <>
      <EditorToolbarButton
        disabled={!canUndo}
        icon={<Undo2 aria-hidden="true" className="size-3.5" />}
        label="Undo"
        onClick={handleUndo}
      />

      <EditorToolbarButton
        disabled={!canRedo}
        icon={<Redo2 aria-hidden="true" className="size-3.5" />}
        label="Redo"
        onClick={handleRedo}
      />
    </>
  );
}
