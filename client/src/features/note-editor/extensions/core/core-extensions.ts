import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";

import { SlashCommandExtension } from "../../slash-commands/extensions/slash-command-extension";

export const coreEditorExtensions = [
  StarterKit.configure({
    codeBlock: false,
    link: false,
    heading: {
      levels: [1, 2, 3],
    },
  }),

  Placeholder.configure({
    placeholder: "Start writing your note...",
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),

  Highlight.configure({
    multicolor: true,
  }),

  CharacterCount,
  SlashCommandExtension,
];
