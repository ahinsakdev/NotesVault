import { useEditorState, type Editor } from "@tiptap/react";
import { CheckSquare, IndentIncrease, Outdent } from "lucide-react";

import { EditorToolbarButton } from "./editor-toolbar-button";

type TaskListGroupProps = {
  editor: Editor | null;
};

type TaskListState = {
  canIndent: boolean;
  canOutdent: boolean;
  isActive: boolean;
};

const EMPTY_TASK_LIST_STATE: TaskListState = {
  canIndent: false,
  canOutdent: false,
  isActive: false,
};

export function TaskListGroup({ editor }: TaskListGroupProps) {
  const taskListState = useEditorState({
    editor,

    selector: ({ editor: currentEditor }): TaskListState => {
      if (!currentEditor || currentEditor.isDestroyed) {
        return EMPTY_TASK_LIST_STATE;
      }

      const commands = currentEditor.can();

      return {
        canIndent: commands.sinkListItem("taskItem"),
        canOutdent: commands.liftListItem("taskItem"),
        isActive: currentEditor.isActive("taskList"),
      };
    },
  });

  const {
    canIndent = false,
    canOutdent = false,
    isActive = false,
  } = taskListState ?? EMPTY_TASK_LIST_STATE;

  function handleToggleTaskList() {
    if (!editor || editor.isDestroyed) {
      return;
    }

    editor.chain().focus().toggleTaskList().run();
  }

  function handleIndentTask() {
    if (!editor || editor.isDestroyed) {
      return;
    }

    editor.chain().focus().sinkListItem("taskItem").run();
  }

  function handleOutdentTask() {
    if (!editor || editor.isDestroyed) {
      return;
    }

    editor.chain().focus().liftListItem("taskItem").run();
  }

  return (
    <>
      <EditorToolbarButton
        icon={<CheckSquare aria-hidden="true" className="size-3.5" />}
        isActive={isActive}
        label="Task list"
        onClick={handleToggleTaskList}
      />

      <EditorToolbarButton
        disabled={!canIndent}
        icon={<IndentIncrease aria-hidden="true" className="size-3.5" />}
        label="Indent task"
        onClick={handleIndentTask}
      />

      <EditorToolbarButton
        disabled={!canOutdent}
        icon={<Outdent aria-hidden="true" className="size-3.5" />}
        label="Outdent task"
        onClick={handleOutdentTask}
      />
    </>
  );
}
