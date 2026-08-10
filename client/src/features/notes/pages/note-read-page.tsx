import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router";

import { ROUTES } from "@/app/routes";
import { useAppShell } from "@/components/layout/use-app-shell";

import { NoteReadContent } from "../components/read-mode/note-read-content";
import { NoteReadFooter } from "../components/read-mode/note-read-footer";
import { NoteReadHeader } from "../components/read-mode/note-read-header";
import { NoteReadHero } from "../components/read-mode/note-read-hero";
import { NoteReadOutline } from "../components/read-mode/note-read-outline";
import { NoteReaderPreferences } from "../components/read-mode/note-reader-preferences";
import { notesMockData } from "../data/notes.mock-data";
import { useActiveReadingHeading } from "../hooks/use-active-reading-heading";
import { useReaderHeaderState } from "../hooks/use-reader-header-state";
import { useReaderKeyboardShortcuts } from "../hooks/use-reader-keyboard-shortcuts";
import { useReaderPreferences } from "../hooks/use-reader-preferences";
import type { Note } from "../types/note.types";
import type { NoteOutlineItem } from "../types/note-outline.types";

type NoteReadDocumentProps = {
  note: Note;
};

function NoteReadDocument({ note }: NoteReadDocumentProps) {
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const preferencesTriggerRef = useRef<HTMLButtonElement | null>(null);

  const { isCompact: isHeaderCompact } = useReaderHeaderState();
  const { enterFocusMode, exitFocusMode } = useAppShell();

  const {
    preferences,
    resetPreferences,
    setFontFamily,
    setFontSize,
    setLineHeight,
    setWidth,
  } = useReaderPreferences();

  useEffect(() => {
    enterFocusMode();

    return () => {
      exitFocusMode();
    };
  }, [enterFocusMode, exitFocusMode]);

  useReaderKeyboardShortcuts({
    noteId: note.id,
  });

  const outline = useMemo<NoteOutlineItem[]>(() => [], []);

  const activeHeadingId = useActiveReadingHeading(outline);

  const wordCount = useMemo(
    () => note.preview.trim().split(/\s+/).filter(Boolean).length,
    [note.preview],
  );

  const readingMinutes = Math.max(1, Math.ceil(wordCount / 220));

  const handleCloseOutline = useCallback(() => {
    setIsOutlineOpen(false);
  }, []);

  function handleSelectOutlineItem(item: NoteOutlineItem) {
    const heading = document.getElementById(item.id);

    heading?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setIsOutlineOpen(false);
  }

  return (
    <>
      <section className="relative min-h-full pb-16" data-reader-document>
        <NoteReadHeader
          isCompact={isHeaderCompact}
          isFavorite={note.isFavorite}
          isPinned={note.isPinned}
          isPreferencesOpen={isPreferencesOpen}
          noteId={note.id}
          noteTitle={note.title}
          onOpenPreferences={() => setIsPreferencesOpen(true)}
          preferencesTriggerRef={preferencesTriggerRef}
        />

        <NoteReadHero
          note={note}
          readingMinutes={readingMinutes}
          wordCount={wordCount}
        />

        <NoteReadContent content={note.preview} preferences={preferences} />

        <NoteReadFooter
          headingCount={outline.length}
          onOpenOutline={() => setIsOutlineOpen(true)}
          readingMinutes={readingMinutes}
          wordCount={wordCount}
        />
      </section>

      <NoteReadOutline
        activeHeadingId={activeHeadingId}
        isOpen={isOutlineOpen}
        items={outline}
        onClose={handleCloseOutline}
        onSelect={handleSelectOutlineItem}
      />

      <NoteReaderPreferences
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        onFontFamilyChange={setFontFamily}
        onFontSizeChange={setFontSize}
        onLineHeightChange={setLineHeight}
        onReset={resetPreferences}
        onWidthChange={setWidth}
        preferences={preferences}
        triggerRef={preferencesTriggerRef}
      />
    </>
  );
}

export function NoteReadPage() {
  const { noteId } = useParams();

  const note = notesMockData.find((currentNote) => currentNote.id === noteId);

  if (!note) {
    return <Navigate replace to={ROUTES.notes} />;
  }

  return <NoteReadDocument note={note} />;
}
