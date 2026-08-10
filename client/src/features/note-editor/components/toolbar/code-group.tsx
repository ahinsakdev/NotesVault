import type { Editor } from "@tiptap/react";
import { Code, Code2, Copy } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

import { EditorCodeLanguageSelect } from "../code/editor-code-language-select";
import { EditorToolbarButton } from "./editor-toolbar-button";

type CodeGroupProps = {
  editor: Editor;
};

export function CodeGroup({ editor }: CodeGroupProps) {
  const { showToast } = useToast();

  async function handleCopyCode() {
    if (!editor.isActive("codeBlock")) {
      return;
    }

    const code = editor.state.selection.$from.parent.textContent;

    try {
      await navigator.clipboard.writeText(code);

      showToast({
        message: "Code block copied to the clipboard.",
        title: "Copied",
        variant: "success",
      });
    } catch {
      showToast({
        message: "Unable to copy the code block.",
        title: "Copy failed",
        variant: "error",
      });
    }
  }

  return (
    <>
      <EditorToolbarButton
        icon={<Code aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("code")}
        label="Inline code"
        onClick={() => editor.chain().focus().toggleCode().run()}
      />

      <EditorToolbarButton
        icon={<Code2 aria-hidden="true" className="size-3.5" />}
        isActive={editor.isActive("codeBlock")}
        label="Code block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />

      <EditorCodeLanguageSelect editor={editor} />

      <EditorToolbarButton
        disabled={!editor.isActive("codeBlock")}
        icon={<Copy aria-hidden="true" className="size-3.5" />}
        label="Copy code block"
        onClick={() => {
          void handleCopyCode();
        }}
      />
    </>
  );
}
