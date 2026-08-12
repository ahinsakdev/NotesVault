import { useEffect } from "react";
import { EditorContent, type JSONContent, useEditor } from "@tiptap/react";

import { editorExtensions } from "@/features/note-editor/extensions/editor-extensions";
import { cn } from "@/utils/cn";

import type { ReaderPreferences } from "../../types/reader-preferences.types";

type NoteReadContentProps = {
  content: JSONContent;
  preferences: ReaderPreferences;
};

export function NoteReadContent({
  content,
  preferences,
}: NoteReadContentProps) {
  const editor = useEditor({
    extensions: editorExtensions,
    content,
    contentType: "json",
    editable: false,
    shouldRerenderOnTransaction: false,

    editorProps: {
      attributes: {
        class: "notesvault-editor notesvault-reader outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.commands.setContent(content, {
      emitUpdate: false,
    });
  }, [content, editor]);

  return (
    <article
      className="flex-1 border-t border-border bg-card px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-10"
      data-reader-content
    >
      <div
        className={cn(
          "mx-auto w-full transition-[max-width] duration-[var(--motion-standard)]",
          preferences.width === "compact" && "max-w-[640px]",
          preferences.width === "comfortable" && "max-w-[760px]",
          preferences.width === "wide" && "max-w-[900px]",
        )}
      >
        <div
          className={cn(
            preferences.fontFamily === "serif"
              ? "notesvault-reader--serif"
              : "notesvault-reader--sans",
            preferences.fontSize === "small" && "notesvault-reader--small",
            preferences.fontSize === "default" && "notesvault-reader--default",
            preferences.fontSize === "large" && "notesvault-reader--large",
            preferences.lineHeight === "compact" &&
              "notesvault-reader--compact",
            preferences.lineHeight === "normal" && "notesvault-reader--normal",
            preferences.lineHeight === "relaxed" &&
              "notesvault-reader--relaxed",
          )}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </article>
  );
}
