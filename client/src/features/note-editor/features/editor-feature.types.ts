import type { EditorExtensionCollection } from "../extensions/shared/editor-extension.types";

export type EditorFeatureId =
  | "core"
  | "markdown"
  | "code"
  | "table"
  | "office"
  | "media"
  | "search";

export type EditorFeatureConfig = {
  id: EditorFeatureId;
  label: string;
  description: string;
  isEnabled: boolean;
};

export type EditorFeature = EditorFeatureConfig & {
  extensions: EditorExtensionCollection;
};
