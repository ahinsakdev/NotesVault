import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Color, TextStyle } from "@tiptap/extension-text-style";

export const officeEditorExtensions = [
  TextStyle,

  Color.configure({
    types: ["textStyle"],
  }),

  TaskList.configure({
    HTMLAttributes: {
      class: "notesvault-task-list",
    },
  }),

  TaskItem.configure({
    nested: true,
    HTMLAttributes: {
      class: "notesvault-task-item",
    },
  }),
];
