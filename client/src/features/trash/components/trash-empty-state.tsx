import { Trash2 } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";

export function TrashEmptyState() {
  return (
    <EmptyState
      description="Notes you delete will appear here until they are restored or permanently removed."
      icon={Trash2}
      title="Trash is empty"
    />
  );
}
