import axios from "axios";
import type { JSONContent } from "@tiptap/react";

import { apiClient } from "@/services/api/api-client";
import { API_ENDPOINTS } from "@/services/api/api-endpoints";

import type { Note } from "../types/note.types";

type NotesResponse = {
  notes: Note[];
};

type NoteResponse = {
  note: Note;
};

type EmptyTrashResponse = {
  deletedCount: number;
};

export type CreateNoteInput = {
  title: string;
  content: JSONContent;
  folderName: string;
  tags: string[];
  isPinned: boolean;
  isFavorite: boolean;
  isArchived: boolean;
};

export type UpdateNoteInput = Partial<CreateNoteInput>;

export async function getNotes(): Promise<Note[]> {
  const response = await apiClient.get<NotesResponse>(API_ENDPOINTS.notes.list);

  return response.data.notes;
}

export async function getArchivedNotes(): Promise<Note[]> {
  const response = await apiClient.get<NotesResponse>(
    API_ENDPOINTS.notes.archived,
  );

  return response.data.notes;
}

export async function getTrashNotes(): Promise<Note[]> {
  const response = await apiClient.get<NotesResponse>(
    API_ENDPOINTS.notes.trash,
  );

  return response.data.notes;
}

export async function getNoteById(noteId: string): Promise<Note | null> {
  try {
    const response = await apiClient.get<NoteResponse>(
      API_ENDPOINTS.notes.byId(noteId),
    );

    return response.data.note;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createNote(input: CreateNoteInput): Promise<Note> {
  const response = await apiClient.post<NoteResponse>(
    API_ENDPOINTS.notes.create,
    input,
  );

  return response.data.note;
}

export async function updateNote(
  noteId: string,
  input: UpdateNoteInput,
): Promise<Note> {
  const response = await apiClient.patch<NoteResponse>(
    API_ENDPOINTS.notes.byId(noteId),
    input,
  );

  return response.data.note;
}

export async function moveNoteToTrash(noteId: string): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.notes.byId(noteId));
}

export async function restoreNote(noteId: string): Promise<Note> {
  const response = await apiClient.patch<NoteResponse>(
    API_ENDPOINTS.notes.restore(noteId),
  );

  return response.data.note;
}

export async function permanentlyDeleteNote(noteId: string): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.notes.permanent(noteId));
}

export async function emptyTrash(): Promise<number> {
  const response = await apiClient.delete<EmptyTrashResponse>(
    API_ENDPOINTS.notes.trash,
  );

  return response.data.deletedCount;
}
