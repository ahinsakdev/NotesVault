import { useEffect, useState } from "react";

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollElement = document.querySelector<HTMLElement>(
      "[data-app-scroll-container]",
    );

    if (!scrollElement) {
      return;
    }

    const scrollContainer: HTMLElement = scrollElement;

    let animationFrameId: number | null = null;

    function updateProgress() {
      const reader = scrollContainer.querySelector<HTMLElement>(
        "[data-reader-document]",
      );

      if (!reader) {
        setProgress((currentProgress) =>
          currentProgress === 0 ? currentProgress : 0,
        );

        animationFrameId = null;

        return;
      }

      const containerRect = scrollContainer.getBoundingClientRect();
      const readerRect = reader.getBoundingClientRect();

      const readerTop =
        readerRect.top - containerRect.top + scrollContainer.scrollTop;

      const readerHeight = reader.offsetHeight;

      const availableDistance = Math.max(
        1,
        readerHeight - scrollContainer.clientHeight,
      );

      const travelledDistance = scrollContainer.scrollTop - readerTop;

      const nextProgress = Math.round(
        Math.min(
          100,
          Math.max(0, (travelledDistance / availableDistance) * 100),
        ),
      );

      setProgress((currentProgress) =>
        currentProgress === nextProgress ? currentProgress : nextProgress,
      );

      animationFrameId = null;
    }

    function scheduleProgressUpdate() {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateProgress);
    }

    animationFrameId = window.requestAnimationFrame(updateProgress);

    scrollContainer.addEventListener("scroll", scheduleProgressUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleProgressUpdate);

    return () => {
      scrollContainer.removeEventListener("scroll", scheduleProgressUpdate);
      window.removeEventListener("resize", scheduleProgressUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return progress;
}
