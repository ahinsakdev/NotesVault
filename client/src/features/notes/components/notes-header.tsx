import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";

type NotesHeaderProps = {
  description?: string;
  isLoading?: boolean;
  noteCount: number;
  title?: string;
};

export function NotesHeader({
  description = "Capture, organize, and revisit everything that matters.",
  isLoading = false,
  noteCount,
  title = "All notes",
}: NotesHeaderProps) {
  const navigate = useNavigate();

  function handleCreateNote() {
    navigate(ROUTES.noteDetails.replace(":noteId", "new"));
  }

  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-medium text-muted-foreground">
          {isLoading
            ? "Loading your notes"
            : `${noteCount} ${noteCount === 1 ? "note" : "notes"}`}
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.035em]">
          {title}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <Button leftIcon={<Plus className="size-4" />} onClick={handleCreateNote}>
        New note
      </Button>
    </header>
  );
}
