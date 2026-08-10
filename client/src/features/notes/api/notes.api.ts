import { notesMockData } from "../data/notes.mock-data";
import type { Note } from "../types/note.types";

const MOCK_REQUEST_DELAY = 250;

function wait(delay: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, delay);
  });
}

export async function getNotes(): Promise<Note[]> {
  await wait(MOCK_REQUEST_DELAY);

  return notesMockData.map((note) => ({
    ...note,
    tags: [...note.tags],
  }));
}

export async function getNoteById(noteId: string): Promise<Note | null> {
  await wait(MOCK_REQUEST_DELAY);

  const note = notesMockData.find((currentNote) => currentNote.id === noteId);

  if (!note) {
    return null;
  }

  return {
    ...note,
    tags: [...note.tags],
  };
}
