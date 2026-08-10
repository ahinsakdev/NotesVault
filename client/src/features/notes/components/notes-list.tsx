import type { Note } from "../types/note.types";
import { NoteListItem } from "./note-list-item";

type NotesListProps = {
  notes: Note[];
};

export function NotesList({ notes }: NotesListProps) {
  return (
    <section aria-label="Notes list" className="space-y-3">
      {notes.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </section>
  );
}
