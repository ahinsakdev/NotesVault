import type { Note } from "../types/note.types";
import { NoteCard } from "./note-card";

type NotesGridProps = {
  notes: Note[];
};

export function NotesGrid({ notes }: NotesGridProps) {
  return (
    <section
      aria-label="Notes grid"
      className="notes-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {notes.map((note) => (
        <div className="notes-grid-cell" key={note.id}>
          <NoteCard note={note} />
        </div>
      ))}
    </section>
  );
}
