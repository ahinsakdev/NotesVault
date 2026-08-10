import { ImagePlus } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { EditorContent, type JSONContent, useEditor } from "@tiptap/react";

import { useEditorPreferences } from "@/features/settings/hooks/use-editor-preferences";
import { cn } from "@/utils/cn";

import { useEditorCommandPalette } from "../command-palette/hooks/use-editor-command-palette";
import { editorExtensions } from "../extensions/editor-extensions";
import { useEditorImageTransfer } from "../hooks/use-editor-image-transfer";
import { useEditorShortcutsDialog } from "../hooks/use-editor-shortcuts-dialog";
import { useEditorSearch } from "../search/hooks/use-editor-search";
import { useSearchShortcuts } from "../search/hooks/use-search-shortcuts";
import { downloadMarkdownFile } from "../utils/markdown.utils";
import { EditorBubbleMenu } from "./editor-bubble-menu";
import { EditorStatistics } from "./editor-statistics";
import { EditorToolbar } from "./toolbar/editor-toolbar";

const EditorSearchBar = lazy(() =>
  import("../search/components/editor-search-bar").then((module) => ({
    default: module.EditorSearchBar,
  })),
);

const EditorCommandPalette = lazy(() =>
  import("../command-palette/components/editor-command-palette").then(
    (module) => ({
      default: module.EditorCommandPalette,
    }),
  ),
);

const EditorShortcutsDialog = lazy(() =>
  import("./shortcuts/editor-shortcuts-dialog").then((module) => ({
    default: module.EditorShortcutsDialog,
  })),
);

type RichTextEditorProps = {
  content: JSONContent;
  isFocusMode: boolean;
  noteTitle: string;
  onChange: (content: JSONContent) => void;
  onExportReady: (handler: () => void) => void;
  onImportedTitleChange: (title: string) => void;
};

export function RichTextEditor({
  content,
  isFocusMode,
  noteTitle,
  onChange,
  onExportReady,
  onImportedTitleChange,
}: RichTextEditorProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReplaceVisible, setIsReplaceVisible] = useState(false);

  const { preferences: editorPreferences } = useEditorPreferences();

  const editor = useEditor({
    extensions: editorExtensions,
    content,
    contentType: "json",
    shouldRerenderOnTransaction: false,

    editorProps: {
      attributes: {
        class:
          "notesvault-editor min-h-[32rem] px-5 py-5 text-sm leading-7 outline-none sm:px-7",
        spellcheck: editorPreferences.spellcheck ? "true" : "false",
      },
    },

    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setOptions({
      editorProps: {
        attributes: {
          class:
            "notesvault-editor min-h-[32rem] px-5 py-5 text-sm leading-7 outline-none sm:px-7",
          spellcheck: editorPreferences.spellcheck ? "true" : "false",
        },
      },
    });
  }, [editor, editorPreferences.spellcheck]);

  const {
    activeMatchIndex,
    closeSearch,
    matches,
    next,
    options,
    previous,
    query,
    replace,
    replaceAll,
    replaceOne,
    setQuery,
    setReplace,
    toggleMatchCase,
    toggleWholeWord,
  } = useEditorSearch({
    editor,
  });

  const {
    closeDialog: closeShortcutsDialog,
    isOpen: isShortcutsDialogOpen,
    openDialog: openShortcutsDialog,
  } = useEditorShortcutsDialog();

  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDraggingImage,
  } = useEditorImageTransfer({
    editor,
  });

  function openSearch() {
    setIsSearchOpen(true);
    setIsReplaceVisible(false);
  }

  function openReplace() {
    setIsSearchOpen(true);
    setIsReplaceVisible(true);
  }

  function handleCloseSearch() {
    closeSearch();
    setIsSearchOpen(false);
    setIsReplaceVisible(false);
  }

  const { closePalette, isOpen: isCommandPaletteOpen } =
    useEditorCommandPalette({
      isSearchOpen,
      onCloseSearch: handleCloseSearch,
    });

  useSearchShortcuts({
    isOpen: isSearchOpen,
    onClose: handleCloseSearch,
    onNext: next,
    onOpenFind: openSearch,
    onOpenReplace: openReplace,
    onPrevious: previous,
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    onExportReady(() => {
      downloadMarkdownFile(editor.getMarkdown(), noteTitle);
    });
  }, [editor, noteTitle, onExportReady]);

  return (
    <div
      className="relative min-w-0"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <EditorToolbar
        editor={editor}
        noteTitle={noteTitle}
        onImportedTitleChange={onImportedTitleChange}
        onOpenShortcuts={openShortcutsDialog}
      />

      {isSearchOpen ? (
        <Suspense fallback={null}>
          <EditorSearchBar
            currentMatch={activeMatchIndex}
            isReplaceVisible={isReplaceVisible}
            matchCase={options.matchCase}
            onClose={handleCloseSearch}
            onNext={next}
            onPrevious={previous}
            onQueryChange={setQuery}
            onReplace={replaceOne}
            onReplaceAll={replaceAll}
            onReplaceChange={setReplace}
            onToggleMatchCase={toggleMatchCase}
            onToggleWholeWord={toggleWholeWord}
            query={query}
            replace={replace}
            totalMatches={matches.length}
            wholeWord={options.wholeWord}
          />
        </Suspense>
      ) : null}

      {editor ? <EditorBubbleMenu editor={editor} /> : null}

      <div
        className={cn(
          "relative w-full",
          !isFocusMode && "mx-auto max-w-[980px]",
        )}
      >
        <EditorContent editor={editor} />

        <EditorStatistics editor={editor} />
      </div>

      {isDraggingImage ? (
        <div aria-hidden="true" className="notesvault-image-drop-overlay">
          <div className="notesvault-image-drop-content">
            <ImagePlus aria-hidden="true" className="size-5" />

            <span>Drop image to insert</span>
          </div>
        </div>
      ) : null}

      {editor && isCommandPaletteOpen ? (
        <Suspense fallback={null}>
          <EditorCommandPalette
            editor={editor}
            isOpen
            onClose={closePalette}
            onOpenShortcuts={openShortcutsDialog}
          />
        </Suspense>
      ) : null}

      {isShortcutsDialogOpen ? (
        <Suspense fallback={null}>
          <EditorShortcutsDialog
            isOpen
            onClose={closeShortcutsDialog}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
