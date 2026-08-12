import { NOTE_VALIDATION } from "../constants/note.constants.js";
import type { NoteContentNode } from "../types/note-content.types.js";

function extractNodeText(node: NoteContentNode): string {
  const ownText = typeof node.text === "string" ? node.text : "";

  const childText = Array.isArray(node.content)
    ? node.content.map((child) => extractNodeText(child)).join(" ")
    : "";

  return [ownText, childText]
    .filter(Boolean)
    .join(" ");
}

export function extractPlainTextFromNoteContent(
  content: NoteContentNode,
): string {
  return extractNodeText(content)
    .replace(/\s+/g, " ")
    .trim();
}

export function createNotePreview(
  content: NoteContentNode,
): string {
  const plainText = extractPlainTextFromNoteContent(content);

  if (plainText.length <= NOTE_VALIDATION.previewMaxLength) {
    return plainText;
  }

  return plainText.slice(0, NOTE_VALIDATION.previewMaxLength).trimEnd();
}
