import { useEffect, useState } from "react";

const COMPACT_HEADER_OFFSET = 48;

export function useReaderHeaderState() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const scrollElement = document.querySelector<HTMLElement>(
      "[data-app-scroll-container]",
    );

    const heroElement =
      document.querySelector<HTMLElement>("[data-reader-hero]");

    if (!scrollElement || !heroElement) {
      return;
    }

    const scrollContainer: HTMLElement = scrollElement;
    const readerHero: HTMLElement = heroElement;

    let animationFrameId: number | null = null;

    function updateHeaderState() {
      const containerRect = scrollContainer.getBoundingClientRect();
      const heroRect = readerHero.getBoundingClientRect();

      const nextIsCompact =
        heroRect.bottom <= containerRect.top + COMPACT_HEADER_OFFSET;

      setIsCompact((currentValue) =>
        currentValue === nextIsCompact ? currentValue : nextIsCompact,
      );

      animationFrameId = null;
    }

    function scheduleHeaderUpdate() {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateHeaderState);
    }

    animationFrameId = window.requestAnimationFrame(updateHeaderState);

    scrollContainer.addEventListener("scroll", scheduleHeaderUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleHeaderUpdate);

    return () => {
      scrollContainer.removeEventListener("scroll", scheduleHeaderUpdate);
      window.removeEventListener("resize", scheduleHeaderUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return {
    isCompact,
  };
}
