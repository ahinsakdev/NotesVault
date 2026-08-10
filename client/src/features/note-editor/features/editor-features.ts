import { codeEditorExtensions } from "../extensions/code/code-extensions";
import { coreEditorExtensions } from "../extensions/core/core-extensions";
import { markdownEditorExtensions } from "../extensions/markdown/markdown-extensions";
import { mediaEditorExtensions } from "../extensions/media/media-extensions";
import { officeEditorExtensions } from "../extensions/office/office-extensions";
import type { EditorExtensionCollection } from "../extensions/shared/editor-extension.types";
import { tableEditorExtensions } from "../extensions/table/table-extensions";
import { searchEditorExtensions } from "../search/extensions/search-extensions";

import { editorFeatureConfig } from "./editor-feature-config";
import type { EditorFeature, EditorFeatureId } from "./editor-feature.types";
import { validateEditorFeatures } from "./validate-editor-features";

const editorExtensionsByFeature: Record<
  EditorFeatureId,
  EditorExtensionCollection
> = {
  core: coreEditorExtensions,
  markdown: markdownEditorExtensions,
  code: codeEditorExtensions,
  table: tableEditorExtensions,
  office: officeEditorExtensions,
  media: mediaEditorExtensions,
  search: searchEditorExtensions,
};

export const editorFeatures: readonly EditorFeature[] =
  editorFeatureConfig.map((feature) => ({
    ...feature,
    extensions: editorExtensionsByFeature[feature.id],
  }));

if (import.meta.env.DEV) {
  validateEditorFeatures(editorFeatures);
}

export function getEnabledEditorFeatures(): EditorFeature[] {
  return editorFeatures.filter((feature) => feature.isEnabled);
}

export function getEditorFeature(
  featureId: EditorFeatureId,
): EditorFeature | undefined {
  return editorFeatures.find((feature) => feature.id === featureId);
}
