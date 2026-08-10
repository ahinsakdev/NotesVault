import type { Editor, Range } from "@tiptap/react";
import type { LucideIcon } from "lucide-react";

import type { EditorFeatureId } from "../../features/editor-feature.types";

export type SlashCommandContext = {
  editor: Editor;
  range: Range;
};

export type SlashCommandItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  keywords: string[];
  featureId?: EditorFeatureId;
  execute: (context: SlashCommandContext) => void;
};

export type SlashCommandMenuHandle = {
  onKeyDown: (event: KeyboardEvent) => boolean;
};
