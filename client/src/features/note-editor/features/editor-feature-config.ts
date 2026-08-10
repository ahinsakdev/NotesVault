import type {
  EditorFeatureConfig,
  EditorFeatureId,
} from "./editor-feature.types";

export const editorFeatureConfig: readonly EditorFeatureConfig[] = [
  {
    id: "core",
    label: "Core editing",
    description:
      "Headings, lists, formatting, alignment, history, and character statistics.",
    isEnabled: true,
  },
  {
    id: "markdown",
    label: "Markdown",
    description:
      "Markdown parsing, serialization, automatic links, import, and export.",
    isEnabled: true,
  },
  {
    id: "code",
    label: "Developer tools",
    description:
      "Inline code, syntax-highlighted code blocks, languages, and code copying.",
    isEnabled: true,
  },
  {
    id: "table",
    label: "Tables",
    description:
      "Resizable tables with row, column, cell, merge, split, and delete controls.",
    isEnabled: true,
  },
  {
    id: "office",
    label: "Office writing",
    description:
      "Task lists, text colors, document dividers, and structured writing controls.",
    isEnabled: true,
  },
  {
    id: "media",
    label: "Media",
    description:
      "Images, captions, alignment, sizing, downloads, and future attachments.",
    isEnabled: true,
  },
  {
    id: "search",
    label: "Document search",
    description:
      "Search highlighting, navigation, and structure-preserving replacement.",
    isEnabled: true,
  },
];

export function getEditorFeatureConfig(
  featureId: EditorFeatureId,
): EditorFeatureConfig | undefined {
  return editorFeatureConfig.find((feature) => feature.id === featureId);
}

export function isEditorFeatureEnabled(featureId: EditorFeatureId): boolean {
  return getEditorFeatureConfig(featureId)?.isEnabled ?? false;
}
