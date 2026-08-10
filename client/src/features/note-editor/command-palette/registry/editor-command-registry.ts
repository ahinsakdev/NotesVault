import {
  Bold,
  CheckSquare,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Keyboard,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Table2,
  Undo2,
} from "lucide-react";

import { isEditorFeatureEnabled } from "../../features/editor-feature-config";
import type { EditorCommandItem } from "../types/editor-command.types";

const editorCommands: EditorCommandItem[] = [
  {
    id: "bold",
    title: "Bold",
    description: "Toggle bold formatting.",
    group: "formatting",
    icon: Bold,
    keywords: ["bold", "strong", "format"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().toggleBold().run();
    },
  },
  {
    id: "italic",
    title: "Italic",
    description: "Toggle italic formatting.",
    group: "formatting",
    icon: Italic,
    keywords: ["italic", "emphasis", "format"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().toggleItalic().run();
    },
  },
  {
    id: "strike",
    title: "Strikethrough",
    description: "Toggle strikethrough formatting.",
    group: "formatting",
    icon: Strikethrough,
    keywords: ["strike", "strikethrough", "format"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().toggleStrike().run();
    },
  },
  {
    id: "inline-code",
    title: "Inline code",
    description: "Toggle inline code formatting.",
    group: "formatting",
    icon: Code2,
    keywords: ["inline", "code", "monospace"],
    featureId: "code",
    execute: ({ editor }) => {
      editor.chain().focus().toggleCode().run();
    },
  },
  {
    id: "paragraph",
    title: "Paragraph",
    description: "Convert the current block to normal text.",
    group: "blocks",
    icon: Pilcrow,
    keywords: ["paragraph", "plain", "normal", "text"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().setParagraph().run();
    },
  },
  {
    id: "heading-1",
    title: "Heading 1",
    description: "Convert the current block to Heading 1.",
    group: "blocks",
    icon: Heading1,
    keywords: ["heading", "h1", "title"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().setHeading({ level: 1 }).run();
    },
  },
  {
    id: "heading-2",
    title: "Heading 2",
    description: "Convert the current block to Heading 2.",
    group: "blocks",
    icon: Heading2,
    keywords: ["heading", "h2", "subtitle"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().setHeading({ level: 2 }).run();
    },
  },
  {
    id: "heading-3",
    title: "Heading 3",
    description: "Convert the current block to Heading 3.",
    group: "blocks",
    icon: Heading3,
    keywords: ["heading", "h3"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().setHeading({ level: 3 }).run();
    },
  },
  {
    id: "bullet-list",
    title: "Bullet list",
    description: "Toggle an unordered list.",
    group: "blocks",
    icon: List,
    keywords: ["bullet", "unordered", "list"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().toggleBulletList().run();
    },
  },
  {
    id: "ordered-list",
    title: "Numbered list",
    description: "Toggle an ordered list.",
    group: "blocks",
    icon: ListOrdered,
    keywords: ["number", "ordered", "list"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().toggleOrderedList().run();
    },
  },
  {
    id: "task-list",
    title: "Task list",
    description: "Toggle an interactive checklist.",
    group: "blocks",
    icon: CheckSquare,
    keywords: ["task", "todo", "checklist"],
    featureId: "office",
    execute: ({ editor }) => {
      editor.chain().focus().toggleTaskList().run();
    },
  },
  {
    id: "quote",
    title: "Quote",
    description: "Toggle a blockquote.",
    group: "blocks",
    icon: Quote,
    keywords: ["quote", "blockquote", "citation"],
    featureId: "core",
    execute: ({ editor }) => {
      editor.chain().focus().toggleBlockquote().run();
    },
  },
  {
    id: "code-block",
    title: "Code block",
    description: "Toggle a code block.",
    group: "blocks",
    icon: Code2,
    keywords: ["code", "programming", "snippet"],
    featureId: "code",
    execute: ({ editor }) => {
      editor.chain().focus().toggleCodeBlock().run();
    },
  },
  {
    id: "divider",
    title: "Divider",
    description: "Insert a horizontal divider.",
    group: "insert",
    icon: Minus,
    keywords: ["divider", "separator", "line"],
    featureId: "office",
    execute: ({ editor }) => {
      editor.chain().focus().setHorizontalRule().run();
    },
  },
  {
    id: "table",
    title: "Table",
    description: "Insert a three-by-three table.",
    group: "insert",
    icon: Table2,
    keywords: ["table", "grid", "rows", "columns"],
    featureId: "table",
    execute: ({ editor }) => {
      editor
        .chain()
        .focus()
        .insertTable({
          rows: 3,
          cols: 3,
          withHeaderRow: true,
        })
        .run();
    },
  },
  {
    id: "undo",
    title: "Undo",
    description: "Undo the latest editor change.",
    group: "history",
    icon: Undo2,
    keywords: ["undo", "history", "revert"],
    isAvailable: (editor) => editor.can().chain().focus().undo().run(),
    execute: ({ editor }) => {
      editor.chain().focus().undo().run();
    },
  },
  {
    id: "redo",
    title: "Redo",
    description: "Restore the latest undone change.",
    group: "history",
    icon: Redo2,
    keywords: ["redo", "history", "restore"],
    isAvailable: (editor) => editor.can().chain().focus().redo().run(),
    execute: ({ editor }) => {
      editor.chain().focus().redo().run();
    },
  },
  {
    id: "keyboard-shortcuts",
    title: "Keyboard shortcuts",
    description: "Open the keyboard shortcut reference.",
    group: "help",
    icon: Keyboard,
    keywords: ["keyboard", "shortcuts", "help", "reference"],
    execute: ({ openShortcuts }) => {
      openShortcuts();
    },
  },
];

export function getAvailableEditorCommands(): EditorCommandItem[] {
  return editorCommands.filter((command) => {
    if (!command.featureId) {
      return true;
    }

    return isEditorFeatureEnabled(command.featureId);
  });
}
