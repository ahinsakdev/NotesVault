import { ROUTES } from "@/app/routes";

import type { DashboardNote } from "../types/dashboard.types";
import { DashboardEmptyState } from "./dashboard-empty-state";
import { DashboardSectionHeader } from "./dashboard-section-header";
import { NoteCard } from "./note-card";

type PinnedNotesSectionProps = {
  notes: DashboardNote[];
};

export function PinnedNotesSection({
  notes,
}: PinnedNotesSectionProps) {
  return (
    <section>
      <DashboardSectionHeader
        description="Important notes kept within reach."
        linkLabel="View all"
        linkTo={ROUTES.pinned}
        title="Pinned notes"
      />

      {notes.length > 0 ? (
        <div className="space-y-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          description="Notes you pin will appear here."
          title="No pinned notes"
        />
      )}
    </section>
  );
}
