import type { Note } from "@/features/notes/types/note.types";

import { TrashNoteCard } from "./trash-note-card";

type TrashNotesGridProps = {
  notes: Note[];
  onDelete: (note: Note) => void;
  onRestore: (note: Note) => void;
};

export function TrashNotesGrid({
  notes,
  onDelete,
  onRestore,
}: TrashNotesGridProps) {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <TrashNoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
}
