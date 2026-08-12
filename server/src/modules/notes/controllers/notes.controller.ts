import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../../auth/types/authenticated-request.js";
import type { CreateNoteInput } from "../schemas/create-note.schema.js";
import type { NoteIdParams } from "../schemas/note-id-params.schema.js";
import type { UpdateNoteInput } from "../schemas/update-note.schema.js";
import {
  createNote,
  deleteNoteForUser,
  emptyTrashForUser,
  getArchivedNotesForUser,
  getNoteForUser,
  getNotesForUser,
  getTrashNotesForUser,
  permanentlyDeleteNoteForUser,
  restoreNoteForUser,
  updateNoteForUser,
} from "../services/notes.service.js";

export async function createNoteController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const input = request.body as CreateNoteInput;

  const note = await createNote(authenticatedRequest.user.id, input);

  response.status(201).json({
    note,
  });
}

export async function getNotesController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;

  const notes = await getNotesForUser(authenticatedRequest.user.id);

  response.status(200).json({
    notes,
  });
}

export async function getArchivedNotesController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;

  const notes = await getArchivedNotesForUser(
    authenticatedRequest.user.id,
  );

  response.status(200).json({
    notes,
  });
}

export async function getNoteController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { noteId } = request.params as NoteIdParams;

  const note = await getNoteForUser(authenticatedRequest.user.id, noteId);

  response.status(200).json({
    note,
  });
}

export async function updateNoteController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { noteId } = request.params as NoteIdParams;
  const input = request.body as UpdateNoteInput;

  const note = await updateNoteForUser(
    authenticatedRequest.user.id,
    noteId,
    input,
  );

  response.status(200).json({
    note,
  });
}

export async function deleteNoteController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { noteId } = request.params as NoteIdParams;

  await deleteNoteForUser(authenticatedRequest.user.id, noteId);

  response.status(204).send();
}

export async function restoreNoteController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { noteId } = request.params as NoteIdParams;

  const note = await restoreNoteForUser(authenticatedRequest.user.id, noteId);

  response.status(200).json({
    note,
  });
}

export async function permanentlyDeleteNoteController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { noteId } = request.params as NoteIdParams;

  await permanentlyDeleteNoteForUser(authenticatedRequest.user.id, noteId);

  response.status(204).send();
}

export async function emptyTrashController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;

  const deletedCount = await emptyTrashForUser(authenticatedRequest.user.id);

  response.status(200).json({
    deletedCount,
  });
}

export async function getTrashNotesController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;

  const notes = await getTrashNotesForUser(authenticatedRequest.user.id);

  response.status(200).json({
    notes,
  });
}