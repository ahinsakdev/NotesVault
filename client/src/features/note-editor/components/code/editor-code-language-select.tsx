import type { Editor } from "@tiptap/react";

import { codeLanguageOptions } from "../../extensions/code/code-language-options";

type EditorCodeLanguageSelectProps = {
  editor: Editor;
};

export function EditorCodeLanguageSelect({
  editor,
}: EditorCodeLanguageSelectProps) {
  const isCodeBlockActive = editor.isActive("codeBlock");

  const currentLanguage =
    editor.getAttributes("codeBlock").language ?? "plaintext";

  return (
    <label className="relative shrink-0">
      <span className="sr-only">Code-block language</span>

      <select
        className="h-8 max-w-32 border border-border bg-background px-2 text-[10px] text-foreground outline-none transition-colors duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!isCodeBlockActive}
        onChange={(event) => {
          editor
            .chain()
            .focus()
            .updateAttributes("codeBlock", {
              language: event.target.value,
            })
            .run();
        }}
        title="Code-block language"
        value={currentLanguage}
      >
        {codeLanguageOptions.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
