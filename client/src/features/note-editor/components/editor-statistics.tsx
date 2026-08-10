import { useEditorState, type Editor } from "@tiptap/react";

type EditorStatisticsProps = {
  editor: Editor | null;
};

type EditorStatisticsState = {
  words: number;
  characters: number;
};

export function EditorStatistics({ editor }: EditorStatisticsProps) {
  const statistics = useEditorState({
    editor,

    selector: ({ editor: currentEditor }): EditorStatisticsState => {
      const characterCount = currentEditor?.storage.characterCount;

      return {
        words: characterCount?.words?.() ?? 0,
        characters: characterCount?.characters?.() ?? 0,
      };
    },
  });

  if (!editor || !statistics) {
    return null;
  }

  const { characters, words } = statistics;

  const readingMinutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));

  return (
    <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border px-5 py-2 text-[10px] text-muted-foreground sm:px-7">
      <span>{words} words</span>
      <span>{characters} characters</span>
      <span>{readingMinutes} min read</span>
    </footer>
  );
}
