import { useEffect, useState } from "react";

import type { NoteOutlineItem } from "../types/note-outline.types";

export function useActiveReadingHeading(outline: NoteOutlineItem[]) {
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(
    () => outline[0]?.id ?? null,
  );

  useEffect(() => {
    const scrollElement = document.querySelector<HTMLElement>(
      "[data-app-scroll-container]",
    );

    if (!scrollElement || outline.length === 0) {
      return;
    }

    const scrollContainer: HTMLElement = scrollElement;

    let animationFrameId: number | null = null;

    function updateActiveHeading() {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const activationOffset = containerTop + 96;

      let nextActiveId = outline[0]?.id ?? null;

      for (const item of outline) {
        const heading = document.getElementById(item.id);

        if (!heading) {
          continue;
        }

        if (heading.getBoundingClientRect().top <= activationOffset) {
          nextActiveId = item.id;
          continue;
        }

        break;
      }

      setActiveHeadingId((currentValue) =>
        currentValue === nextActiveId ? currentValue : nextActiveId,
      );

      animationFrameId = null;
    }

    function scheduleActiveHeadingUpdate() {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateActiveHeading);
    }

    animationFrameId = window.requestAnimationFrame(updateActiveHeading);

    scrollContainer.addEventListener("scroll", scheduleActiveHeadingUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleActiveHeadingUpdate);

    return () => {
      scrollContainer.removeEventListener(
        "scroll",
        scheduleActiveHeadingUpdate,
      );

      window.removeEventListener("resize", scheduleActiveHeadingUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [outline]);

  return outline.length > 0 ? activeHeadingId : null;
}
