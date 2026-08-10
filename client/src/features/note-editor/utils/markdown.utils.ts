export const MARKDOWN_FILE_EXTENSIONS = [".md", ".markdown"] as const;

const invalidFileNameCharacters = '<>:"/\\|?*';

export function getMarkdownTitleFromFileName(fileName: string): string {
  return fileName.replace(/\.(md|markdown)$/i, "").trim();
}

export function isMarkdownFile(file: File): boolean {
  const normalizedName = file.name.toLowerCase();

  return (
    file.type === "text/markdown" ||
    MARKDOWN_FILE_EXTENSIONS.some((extension) =>
      normalizedName.endsWith(extension),
    )
  );
}

export async function readMarkdownFile(file: File): Promise<string> {
  if (!isMarkdownFile(file)) {
    throw new Error("Please select a Markdown file.");
  }

  return file.text();
}

function sanitizeFileName(value: string): string {
  const sanitizedValue = Array.from(value.trim())
    .filter((character) => {
      const characterCode = character.charCodeAt(0);

      return (
        characterCode >= 32 && !invalidFileNameCharacters.includes(character)
      );
    })
    .join("")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return sanitizedValue || "untitled-note";
}

export function downloadMarkdownFile(markdown: string, title: string) {
  const fileName = sanitizeFileName(title);

  const blob = new Blob([markdown], {
    type: "text/markdown;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `${fileName}.md`;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}
