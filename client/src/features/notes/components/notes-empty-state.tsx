import { FilePlus2, SearchX } from "lucide-react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

type NotesEmptyStateProps = {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
};

export function NotesEmptyState({
  hasActiveFilters,
  onClearFilters,
}: NotesEmptyStateProps) {
  const navigate = useNavigate();

  function handleCreateNote() {
    navigate(ROUTES.noteDetails.replace(":noteId", "new"));
  }

  return (
    <EmptyState
      actions={
        <>
          {hasActiveFilters ? (
            <Button onClick={onClearFilters} size="sm" variant="outline">
              Clear filters
            </Button>
          ) : null}

          <Button onClick={handleCreateNote} size="sm">
            New note
          </Button>
        </>
      }
      description={
        hasActiveFilters
          ? "Try changing your search or filter selection."
          : "Create your first note and start building your knowledge workspace."
      }
      icon={hasActiveFilters ? SearchX : FilePlus2}
      title={hasActiveFilters ? "No matching notes" : "No notes yet"}
    />
  );
}
