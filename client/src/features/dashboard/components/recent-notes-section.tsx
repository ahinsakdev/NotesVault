import { ROUTES } from "@/app/routes";

import { recentNotes } from "../data/dashboard.mock-data";
import { DashboardEmptyState } from "./dashboard-empty-state";
import { DashboardSectionHeader } from "./dashboard-section-header";
import { NoteCard } from "./note-card";

export function RecentNotesSection() {
  return (
    <section>
      <DashboardSectionHeader
        description="Notes you recently opened or updated."
        linkLabel="View all"
        linkTo={ROUTES.recent}
        title="Recent notes"
      />

      {recentNotes.length > 0 ? (
        <div className="space-y-3">
          {recentNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          description="Recently opened and updated notes will appear here."
          title="No recent notes"
        />
      )}
    </section>
  );
}
