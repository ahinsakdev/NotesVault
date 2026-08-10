import { useReadingProgress } from "../../hooks/use-reading-progress";

export function NoteReadProgress() {
  const progress = useReadingProgress();

  return (
    <div
      aria-label={`${progress}% read`}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      className="absolute inset-x-0 bottom-0 z-20 h-0.5 bg-border"
      role="progressbar"
    >
      <div
        className="h-full bg-primary transition-[width] duration-[var(--motion-fast)] ease-[var(--motion-ease-standard)]"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
