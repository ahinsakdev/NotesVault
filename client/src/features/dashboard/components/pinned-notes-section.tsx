import { ROUTES } from "@/app/routes";

import { pinnedNotes } from "../data/dashboard.mock-data";
import { DashboardEmptyState } from "./dashboard-empty-state";
import { DashboardSectionHeader } from "./dashboard-section-header";
import { NoteCard } from "./note-card";

export function PinnedNotesSection() {
  return (
    <section>
      <DashboardSectionHeader
        description="Important notes kept within reach."
        linkLabel="View all"
        linkTo={ROUTES.pinned}
        title="Pinned notes"
      />

      {pinnedNotes.length > 0 ? (
        <div className="space-y-3">
          {pinnedNotes.map((note) => (
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
