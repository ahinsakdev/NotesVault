import type { Editor } from "@tiptap/react";
import { Download, Upload } from "lucide-react";
import { useRef, type ChangeEvent } from "react";

import { useToast } from "@/hooks/use-toast";

import {
  downloadMarkdownFile,
  getMarkdownTitleFromFileName,
  readMarkdownFile,
} from "../utils/markdown.utils";
import { EditorToolbarButton } from "./toolbar/editor-toolbar-button";

type EditorFileActionsProps = {
  editor: Editor;
  noteTitle: string;
  onImportedTitleChange: (title: string) => void;
};

export function EditorFileActions({
  editor,
  noteTitle,
  onImportedTitleChange,
}: EditorFileActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { showToast } = useToast();

  function handleOpenFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const markdown = await readMarkdownFile(file);

      editor.commands.setContent(markdown, {
        contentType: "markdown",
        emitUpdate: true,
      });

      if (!noteTitle.trim()) {
        onImportedTitleChange(getMarkdownTitleFromFileName(file.name));
      }

      showToast({
        message: "The Markdown file was imported successfully.",
        title: "Import complete",
        variant: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to open the Markdown file.";

      showToast({
        message,
        title: "Markdown import failed",
        variant: "error",
      });
    } finally {
      event.target.value = "";
    }
  }

  function handleExportMarkdown() {
    const markdown = editor.getMarkdown();

    downloadMarkdownFile(markdown, noteTitle);

    showToast({
      message: "Your Markdown file has been exported.",
      title: "Export complete",
      variant: "success",
    });
  }

  return (
    <>
      <input
        accept=".md,.markdown,text/markdown"
        className="sr-only"
        onChange={(event) => {
          void handleFileChange(event);
        }}
        ref={fileInputRef}
        type="file"
      />

      <EditorToolbarButton
        icon={<Upload aria-hidden="true" className="size-3.5" />}
        label="Import Markdown file"
        onClick={handleOpenFilePicker}
      />

      <EditorToolbarButton
        icon={<Download aria-hidden="true" className="size-3.5" />}
        label="Export Markdown file"
        onClick={handleExportMarkdown}
      />
    </>
  );
}
