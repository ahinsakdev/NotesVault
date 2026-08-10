import {
  CheckSquare,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Table2,
} from "lucide-react";

import { isEditorFeatureEnabled } from "../../features/editor-feature-config";
import type { SlashCommandItem } from "../types/slash-command.types";

const slashCommandItems: SlashCommandItem[] = [
  {
    id: "paragraph",
    title: "Paragraph",
    description: "Continue writing with normal text.",
    icon: Pilcrow,
    keywords: ["paragraph", "text", "plain", "normal"],
    featureId: "core",
    execute: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    id: "heading-1",
    title: "Heading 1",
    description: "Large section heading.",
    icon: Heading1,
    keywords: ["heading", "h1", "title", "large"],
    featureId: "core",
    execute: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
    },
  },
  {
    id: "heading-2",
    title: "Heading 2",
    description: "Medium section heading.",
    icon: Heading2,
    keywords: ["heading", "h2", "subtitle", "medium"],
    featureId: "core",
    execute: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
    },
  },
  {
    id: "heading-3",
    title: "Heading 3",
    description: "Small section heading.",
    icon: Heading3,
    keywords: ["heading", "h3", "small"],
    featureId: "core",
    execute: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
    },
  },
  {
    id: "bullet-list",
    title: "Bullet list",
    description: "Create an unordered list.",
    icon: List,
    keywords: ["bullet", "list", "unordered", "points"],
    featureId: "core",
    execute: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    id: "ordered-list",
    title: "Numbered list",
    description: "Create an ordered list.",
    icon: ListOrdered,
    keywords: ["number", "numbered", "ordered", "list"],
    featureId: "core",
    execute: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    id: "task-list",
    title: "Task list",
    description: "Create a checklist with completion states.",
    icon: CheckSquare,
    keywords: ["task", "todo", "check", "checklist"],
    featureId: "office",
    execute: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    id: "blockquote",
    title: "Quote",
    description: "Emphasize a quotation or important passage.",
    icon: Quote,
    keywords: ["quote", "blockquote", "citation"],
    featureId: "core",
    execute: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    id: "code-block",
    title: "Code block",
    description: "Insert a syntax-highlighted code section.",
    icon: Code2,
    keywords: ["code", "developer", "programming", "snippet"],
    featureId: "code",
    execute: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setCodeBlock({
          language: "plaintext",
        })
        .run();
    },
  },
  {
    id: "horizontal-rule",
    title: "Divider",
    description: "Separate document sections with a line.",
    icon: Minus,
    keywords: ["divider", "line", "rule", "separator"],
    featureId: "office",
    execute: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  {
    id: "table",
    title: "Table",
    description: "Insert a table with three rows and columns.",
    icon: Table2,
    keywords: ["table", "grid", "rows", "columns"],
    featureId: "table",
    execute: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({
          rows: 3,
          cols: 3,
          withHeaderRow: true,
        })
        .run();
    },
  },
];

export function getAvailableSlashCommands(): SlashCommandItem[] {
  return slashCommandItems.filter((command) => {
    if (!command.featureId) {
      return true;
    }

    return isEditorFeatureEnabled(command.featureId);
  });
}
