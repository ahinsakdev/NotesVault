import type { EditorFeature } from "./editor-feature.types";

export function validateEditorFeatures(features: readonly EditorFeature[]) {
  const featureIds = new Set<string>();

  for (const feature of features) {
    if (featureIds.has(feature.id)) {
      throw new Error(`Duplicate editor feature id: ${feature.id}`);
    }

    featureIds.add(feature.id);

    if (feature.isEnabled && feature.extensions.length === 0) {
      throw new Error(
        `Enabled editor feature "${feature.id}" has no extensions.`,
      );
    }
  }
}
