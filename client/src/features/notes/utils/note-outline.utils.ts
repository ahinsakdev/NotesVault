import type { JSONContent } from "@tiptap/react";

import type {
  NoteOutlineItem,
  NoteOutlineLevel,
} from "../types/note-outline.types";

function extractNodeText(node: JSONContent): string {
  const ownText = typeof node.text === "string" ? node.text : "";

  const childText =
    node.content?.map((child) => extractNodeText(child)).join("") ?? "";

  return `${ownText}${childText}`.trim();
}

function createSlug(value: string): string {
  const normalizedValue = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return normalizedValue || "section";
}

function getHeadingLevel(node: JSONContent): NoteOutlineLevel {
  const level = node.attrs?.level;

  if (level === 1 || level === 2 || level === 3) {
    return level;
  }

  return 2;
}

export function createNoteOutline(content: JSONContent): NoteOutlineItem[] {
  const outline: NoteOutlineItem[] = [];
  const slugCounts = new Map<string, number>();

  function visitNode(node: JSONContent) {
    if (node.type === "heading") {
      const title = extractNodeText(node) || "Untitled section";

      const baseSlug = createSlug(title);
      const currentCount = slugCounts.get(baseSlug) ?? 0;

      slugCounts.set(baseSlug, currentCount + 1);

      const id =
        currentCount === 0 ? baseSlug : `${baseSlug}-${currentCount + 1}`;

      outline.push({
        id,
        level: getHeadingLevel(node),
        title,
      });
    }

    node.content?.forEach(visitNode);
  }

  visitNode(content);

  return outline;
}
