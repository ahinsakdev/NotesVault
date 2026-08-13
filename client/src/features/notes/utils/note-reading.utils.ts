import type { JSONContent } from "@tiptap/react";

const WORDS_PER_MINUTE = 200;

function extractTextFromContent(node: JSONContent): string {
  const ownText = typeof node.text === "string" ? node.text : "";

  const childText =
    node.content
      ?.map((childNode) => extractTextFromContent(childNode))
      .join(" ") ?? "";

  return [ownText, childText].filter(Boolean).join(" ");
}

export function getNoteWordCount(content: JSONContent): number {
  const text = extractTextFromContent(content).trim();

  if (!text) {
    return 0;
  }

  return text.split(/\s+/).filter(Boolean).length;
}

export function getNoteReadingMinutes(wordCount: number): number {
  if (wordCount === 0) {
    return 0;
  }

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
