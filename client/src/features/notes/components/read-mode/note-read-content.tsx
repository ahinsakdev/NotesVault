import { useMemo } from "react";

import { cn } from "@/utils/cn";

import type { ReaderPreferences } from "../../types/reader-preferences.types";

type NoteReadContentProps = {
  content: string;
  preferences: ReaderPreferences;
};

export function NoteReadContent({
  content,
  preferences,
}: NoteReadContentProps) {
  const paragraphs = useMemo(
    () =>
      content
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    [content],
  );

  return (
    <article
      className="flex-1 border-t border-border bg-card px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-10"
      data-reader-content
    >
      <div
        className={cn(
          "mx-auto w-full transition-[max-width] duration-[var(--motion-standard)]",
          preferences.width === "compact" && "max-w-[640px]",
          preferences.width === "comfortable" && "max-w-[760px]",
          preferences.width === "wide" && "max-w-[900px]",
        )}
      >
        <div
          className={cn(
            "notesvault-editor notesvault-reader",
            preferences.fontFamily === "serif"
              ? "notesvault-reader--serif"
              : "notesvault-reader--sans",
            preferences.fontSize === "small" && "notesvault-reader--small",
            preferences.fontSize === "default" && "notesvault-reader--default",
            preferences.fontSize === "large" && "notesvault-reader--large",
            preferences.lineHeight === "compact" &&
              "notesvault-reader--compact",
            preferences.lineHeight === "normal" && "notesvault-reader--normal",
            preferences.lineHeight === "relaxed" &&
              "notesvault-reader--relaxed",
          )}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
