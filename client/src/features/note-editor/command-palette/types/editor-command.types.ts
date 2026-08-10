import type { Editor } from "@tiptap/react";
import type { LucideIcon } from "lucide-react";

import type { EditorFeatureId } from "../../features/editor-feature.types";

export type EditorCommandGroup =
  | "formatting"
  | "blocks"
  | "insert"
  | "history"
  | "help";

export type EditorCommandContext = {
  editor: Editor;
  openShortcuts: () => void;
};

export type EditorCommandItem = {
  id: string;
  title: string;
  description: string;
  group: EditorCommandGroup;
  icon: LucideIcon;
  keywords: string[];
  featureId?: EditorFeatureId;
  isAvailable?: (editor: Editor) => boolean;
  execute: (context: EditorCommandContext) => void;
};
