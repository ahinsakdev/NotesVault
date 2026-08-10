import type { JSONContent } from "@tiptap/react";

import { cn } from "@/utils/cn";

import type { NoteEditorValues } from "../types/note-editor.types";
import { RichTextEditor } from "./rich-text-editor";

type NoteEditorMainProps = {
  isFocusMode: boolean;
  values: NoteEditorValues;
  onContentChange: (value: JSONContent) => void;
  onExportReady: (handler: () => void) => void;
  onTitleChange: (value: string) => void;
};

export function NoteEditorMain({
  isFocusMode,
  onContentChange,
  onExportReady,
  onTitleChange,
  values,
}: NoteEditorMainProps) {
  return (
    <section className="min-w-0 flex-1 bg-card">
      <div className="border-b border-border bg-surface-subtle px-5 py-4 sm:px-7">
        <div className={cn("w-full", !isFocusMode && "mx-auto max-w-[980px]")}>
          <input
            aria-label="Note title"
            className="h-10 w-full border border-transparent bg-transparent px-1 text-lg font-semibold text-foreground outline-none transition-[border-color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] placeholder:text-muted-foreground focus:border-primary/60 focus:shadow-[inset_0_0_0_1px_var(--primary)]"
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Untitled note"
            type="text"
            value={values.title}
          />
        </div>
      </div>

      <RichTextEditor
        content={values.content}
        isFocusMode={isFocusMode}
        noteTitle={values.title}
        onChange={onContentChange}
        onExportReady={onExportReady}
        onImportedTitleChange={onTitleChange}
      />
    </section>
  );
}
