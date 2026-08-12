import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { FileQuestion } from "lucide-react";

import { ROUTES } from "@/app/routes";

import { EmptyState } from "@/components/ui/empty-state";

import { useAppShell } from "@/components/layout/use-app-shell";
import { RouteLoadingFallback } from "@/components/ui/route-loading-fallback";
import { useToast } from "@/hooks/use-toast";

import { NotesErrorState } from "../components/notes-error-state";
import { NoteReadContent } from "../components/read-mode/note-read-content";
import { NoteReadFooter } from "../components/read-mode/note-read-footer";
import { NoteReadHeader } from "../components/read-mode/note-read-header";
import { NoteReadHero } from "../components/read-mode/note-read-hero";
import { NoteReadOutline } from "../components/read-mode/note-read-outline";
import { NoteReaderPreferences } from "../components/read-mode/note-reader-preferences";
import { useActiveReadingHeading } from "../hooks/use-active-reading-heading";
import { useNote } from "../hooks/use-note";
import { useUpdateNoteState } from "../hooks/use-update-note-state";
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

  const navigate = useNavigate();

  const preferencesTriggerRef = useRef<HTMLButtonElement | null>(null);

  const { showToast } = useToast();
  const updateNoteStateMutation = useUpdateNoteState();

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

  async function handleArchiveChange() {
    if (updateNoteStateMutation.isPending) {
      return;
    }

    const nextArchivedState = !note.isArchived;

    try {
      await updateNoteStateMutation.mutateAsync({
        noteId: note.id,
        updates: {
          isArchived: nextArchivedState,
        },
      });

      showToast({
        title: nextArchivedState ? "Note archived" : "Note unarchived",
        message: nextArchivedState
          ? "The note was moved to Archived."
          : "The note was returned to your active notes.",
        variant: "success",
      });

      navigate(
        nextArchivedState ? ROUTES.archived : ROUTES.notes,
        {
          replace: true,
        },
      );
    } catch {
      showToast({
        title: "Unable to update note",
        message: "The note could not be updated. Please try again.",
        variant: "error",
      });
    }
  }

  async function handlePinnedChange() {
    if (updateNoteStateMutation.isPending) {
      return;
    }

    try {
      await updateNoteStateMutation.mutateAsync({
        noteId: note.id,
        updates: {
          isPinned: !note.isPinned,
        },
      });

      showToast({
        title: note.isPinned ? "Note unpinned" : "Note pinned",
        message: note.isPinned
          ? "The note was removed from your pinned notes."
          : "The note was added to your pinned notes.",
        variant: "success",
      });
    } catch {
      showToast({
        title: "Unable to update note",
        message: "The note could not be updated. Please try again.",
        variant: "error",
      });
    }
  }

  async function handleFavoriteChange() {
    if (updateNoteStateMutation.isPending) {
      return;
    }

    try {
      await updateNoteStateMutation.mutateAsync({
        noteId: note.id,
        updates: {
          isFavorite: !note.isFavorite,
        },
      });

      showToast({
        title: note.isFavorite
          ? "Removed from favorites"
          : "Added to favorites",
        message: note.isFavorite
          ? "The note was removed from your favorites."
          : "The note was added to your favorites.",
        variant: "success",
      });
    } catch {
      showToast({
        title: "Unable to update note",
        message: "The note could not be updated. Please try again.",
        variant: "error",
      });
    }
  }

  return (
    <>
      <section className="relative min-h-full pb-16" data-reader-document>
        <NoteReadHeader
          isArchived={note.isArchived}
          isCompact={isHeaderCompact}
          isFavorite={note.isFavorite}
          isPinned={note.isPinned}
          isPreferencesOpen={isPreferencesOpen}
          noteId={note.id}
          noteTitle={note.title}
          onArchiveChange={() => {
            void handleArchiveChange();
          }}
          onFavoriteChange={() => {
            void handleFavoriteChange();
          }}
          onOpenPreferences={() => setIsPreferencesOpen(true)}
          onPinnedChange={() => {
            void handlePinnedChange();
          }}
          isStateUpdating={updateNoteStateMutation.isPending}
          preferencesTriggerRef={preferencesTriggerRef}
        />

        <NoteReadHero
          note={note}
          readingMinutes={readingMinutes}
          wordCount={wordCount}
        />

        <NoteReadContent content={note.content} preferences={preferences} />

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

  const { data: note, isError, isLoading, refetch } = useNote(noteId ?? null);

  if (isLoading) {
    return <RouteLoadingFallback />;
  }

  if (isError) {
    return (
      <NotesErrorState
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!note) {
    return (
      <EmptyState
        description="This note could not be found. It may have been removed or is no longer available."
        icon={FileQuestion}
        title="Note not found"
      />
    );
  }

  return <NoteReadDocument note={note} />;
}
