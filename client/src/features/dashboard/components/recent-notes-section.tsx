import { ROUTES } from "@/app/routes";

import type { DashboardNote } from "../types/dashboard.types";
import { DashboardEmptyState } from "./dashboard-empty-state";
import { DashboardSectionHeader } from "./dashboard-section-header";
import { NoteCard } from "./note-card";

type RecentNotesSectionProps = {
  notes: DashboardNote[];
};

export function RecentNotesSection({ notes }: RecentNotesSectionProps) {
  return (
    <section>
      <DashboardSectionHeader
        description="Notes you've updated most recently."
        linkLabel="View all"
        linkTo={ROUTES.recent}
        title="Recent notes"
      />

      {notes.length > 0 ? (
        <div className="space-y-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          actionLabel="Create a note"
          actionTo={ROUTES.noteDetails.replace(":noteId", "new")}
          description="Your recently updated notes will appear here."
          title="No recent notes"
        />
      )}
    </section>
  );
}
