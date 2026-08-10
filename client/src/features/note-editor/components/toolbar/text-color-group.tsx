import type { Editor } from "@tiptap/react";
import { Highlighter, Palette, RemoveFormatting } from "lucide-react";

import { EditorToolbarButton } from "./editor-toolbar-button";

const textColors = [
  {
    label: "Default",
    value: "",
  },
  {
    label: "Slate",
    value: "#475569",
  },
  {
    label: "Red",
    value: "#dc2626",
  },
  {
    label: "Orange",
    value: "#ea580c",
  },
  {
    label: "Green",
    value: "#16a34a",
  },
  {
    label: "Blue",
    value: "#2563eb",
  },
  {
    label: "Purple",
    value: "#7c3aed",
  },
] as const;

const highlightColors = [
  {
    label: "None",
    value: "",
  },
  {
    label: "Yellow",
    value: "#fef08a",
  },
  {
    label: "Green",
    value: "#bbf7d0",
  },
  {
    label: "Blue",
    value: "#bfdbfe",
  },
  {
    label: "Purple",
    value: "#ddd6fe",
  },
  {
    label: "Red",
    value: "#fecaca",
  },
] as const;

type TextColorGroupProps = {
  editor: Editor;
};

export function TextColorGroup({ editor }: TextColorGroupProps) {
  const currentTextColor = editor.getAttributes("textStyle").color ?? "";

  const currentHighlightColor = editor.getAttributes("highlight").color ?? "";

  return (
    <>
      <label className="relative inline-flex h-8 w-fit shrink-0 items-center gap-1.5 border border-border bg-background px-2 transition-[border-color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
        <Palette
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground"
        />

        <span className="sr-only">Text color</span>

        <select
          aria-label="Text color"
          className="w-auto min-w-0 bg-transparent pr-1 text-[10px] text-foreground outline-none"
          onChange={(event) => {
            const color = event.target.value;

            if (!color) {
              editor.chain().focus().unsetColor().run();
              return;
            }

            editor.chain().focus().setColor(color).run();
          }}
          title="Text color"
          value={currentTextColor}
        >
          {textColors.map((color) => (
            <option key={color.label} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
      </label>

      <label className="relative inline-flex h-8 w-fit shrink-0 items-center gap-1.5 border border-border bg-background px-2 transition-[border-color,box-shadow] duration-[var(--motion-standard)] ease-[var(--motion-ease-standard)] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
        <Highlighter
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground"
        />

        <span className="sr-only">Highlight color</span>

        <select
          aria-label="Highlight color"
          className="w-auto min-w-0 bg-transparent pr-1 text-[10px] text-foreground outline-none"
          onChange={(event) => {
            const color = event.target.value;

            if (!color) {
              editor.chain().focus().unsetHighlight().run();
              return;
            }

            editor.chain().focus().setHighlight({ color }).run();
          }}
          title="Highlight color"
          value={currentHighlightColor}
        >
          {highlightColors.map((color) => (
            <option key={color.label} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
      </label>

      <EditorToolbarButton
        icon={<RemoveFormatting aria-hidden="true" className="size-3.5" />}
        label="Clear text formatting"
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().run()
        }
      />
    </>
  );
}
