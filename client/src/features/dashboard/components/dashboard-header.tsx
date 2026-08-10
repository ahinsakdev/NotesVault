import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const navigate = useNavigate();

  function handleCreateNote() {
    navigate(ROUTES.noteDetails.replace(":noteId", "new"));
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-medium text-muted-foreground">
          Welcome back, Ahinsak
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.035em]">
          Dashboard
        </h1>
      </div>

      <Button leftIcon={<Plus className="size-4" />} onClick={handleCreateNote}>
        New note
      </Button>
    </div>
  );
}
