import type { Editor } from "@tiptap/react";

import { isEditorFeatureEnabled } from "../../features/editor-feature-config";
import { AlignmentGroup } from "./alignment-group";
import { CodeGroup } from "./code-group";
import { EditorToolbarDivider } from "./editor-toolbar-divider";
import { FileGroup } from "./file-group";
import { FormattingGroup } from "./formatting-group";
import { HistoryGroup } from "./history-group";
import { LinkGroup } from "./link-group";
import { ListGroup } from "./list-group";
import { TableGroup } from "./table-group";
import { TypographyGroup } from "./typography-group";

import { MediaGroup } from "./media-group";
import { EditorShortcutsTrigger } from "../shortcuts/editor-shortcuts-trigger";

import { InsertGroup } from "./insert-group";
import { TaskListGroup } from "./task-list-group";
import { TextColorGroup } from "./text-color-group";

type EditorToolbarProps = {
  editor: Editor | null;
  noteTitle: string;
  onImportedTitleChange: (title: string) => void;
  onOpenShortcuts: () => void;
};

export function EditorToolbar({
  editor,
  noteTitle,
  onImportedTitleChange,
  onOpenShortcuts,
}: EditorToolbarProps) {
  if (!editor) {
    return <div className="h-11 border-y border-border bg-surface-subtle" />;
  }

  const isMarkdownEnabled = isEditorFeatureEnabled("markdown");

  const isCodeEnabled = isEditorFeatureEnabled("code");

  const isTableEnabled = isEditorFeatureEnabled("table");

  const isOfficeEnabled = isEditorFeatureEnabled("office");

  const isMediaEnabled = isEditorFeatureEnabled("media");

  return (
    <div
      aria-label="Editor formatting controls"
      className="editor-toolbar-scrollbar flex min-h-11 items-center gap-0.5 overflow-x-auto border-y border-border bg-surface-subtle px-3 py-1.5"
      role="toolbar"
    >
      <TypographyGroup editor={editor} />

      <EditorToolbarDivider />

      <FormattingGroup editor={editor} />

      <EditorToolbarDivider />

      <ListGroup editor={editor} />

      {isCodeEnabled ? (
        <>
          <EditorToolbarDivider />
          <CodeGroup editor={editor} />
        </>
      ) : null}

      {isMarkdownEnabled ? (
        <>
          <EditorToolbarDivider />
          <LinkGroup editor={editor} />
        </>
      ) : null}

      {isTableEnabled ? (
        <>
          <EditorToolbarDivider />
          <TableGroup editor={editor} />
        </>
      ) : null}

      <EditorToolbarDivider />

      <AlignmentGroup editor={editor} />

      <EditorToolbarDivider />

      <HistoryGroup editor={editor} />

      {isMarkdownEnabled ? (
        <>
          {isOfficeEnabled ? (
            <>
              <EditorToolbarDivider />
              <TaskListGroup editor={editor} />

              <EditorToolbarDivider />
              <TextColorGroup editor={editor} />

              <EditorToolbarDivider />
              <InsertGroup editor={editor} />
            </>
          ) : null}

          {isMediaEnabled ? (
            <>
              <EditorToolbarDivider />
              <MediaGroup editor={editor} />
            </>
          ) : null}

          <FileGroup
            editor={editor}
            noteTitle={noteTitle}
            onImportedTitleChange={onImportedTitleChange}
          />

          <EditorToolbarDivider />

          <EditorShortcutsTrigger onClick={onOpenShortcuts} />
        </>
      ) : null}
    </div>
  );
}
