import type { Extensions } from "@tiptap/react";

import { getEnabledEditorFeatures } from "../features/editor-features";

export const editorExtensions: Extensions = getEnabledEditorFeatures().flatMap(
  (feature) => feature.extensions,
);
