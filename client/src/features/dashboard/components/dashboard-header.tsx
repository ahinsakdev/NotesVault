import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { useAuthenticationSession } from "@/features/authentication/hooks/use-authentication-session";

export function DashboardHeader() {
  const navigate = useNavigate();
  const { data: session } = useAuthenticationSession();

  function handleCreateNote() {
    navigate(ROUTES.noteDetails.replace(":noteId", "new"));
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-medium text-muted-foreground">
          {session ? `Welcome back, ${session.user.firstName}` : "Welcome back"}
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
