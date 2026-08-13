import type { Note } from "../types/note.types";
import { NoteListItem } from "./note-list-item";

type NotesListProps = {
  notes: Note[];
  onArchive?: (note: Note) => void;
  onMoveToTrash?: (note: Note) => void;
  onUnarchive?: (note: Note) => void;
};

export function NotesList({
  notes,
  onArchive,
  onMoveToTrash,
  onUnarchive,
}: NotesListProps) {
  return (
    <section aria-label="Notes list" className="space-y-3">
      {notes.map((note) => (
        <NoteListItem
          key={note.id}
          note={note}
          onArchive={onArchive}
          onMoveToTrash={onMoveToTrash}
          onUnarchive={onUnarchive}
        />
      ))}
    </section>
  );
}
