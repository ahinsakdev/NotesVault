import { Router } from "express";

import { authenticate } from "../../auth/middleware/authenticate.js";
import { validateRequest } from "../../../shared/middleware/validate-request.js";
import {
  createNoteController,
  deleteNoteController,
  emptyTrashController,
  getArchivedNotesController,
  getNoteController,
  getNotesController,
  permanentlyDeleteNoteController,
  restoreNoteController,
  searchNotesController,
  updateNoteController,
  getTrashNotesController,
} from "../controllers/notes.controller.js";
import { createNoteSchema } from "../schemas/create-note.schema.js";
import { noteIdParamsSchema } from "../schemas/note-id-params.schema.js";
import { searchNotesQuerySchema } from "../schemas/search-notes-query.schema.js";
import { updateNoteSchema } from "../schemas/update-note.schema.js";

export const notesRouter = Router();

notesRouter.use(authenticate);

notesRouter.post(
  "/",
  validateRequest(createNoteSchema),
  createNoteController,
);

notesRouter.get(
  "/",
  getNotesController,
);

notesRouter.get(
  "/search",
  validateRequest(searchNotesQuerySchema, "query"),
  searchNotesController,
);

notesRouter.get(
  "/archived",
  getArchivedNotesController,
);

notesRouter.delete(
  "/trash",
  emptyTrashController,
);

notesRouter.get("/trash", getTrashNotesController);

notesRouter.patch(
  "/:noteId/restore",
  validateRequest(noteIdParamsSchema, "params"),
  restoreNoteController,
  searchNotesController,
);

notesRouter.delete(
  "/:noteId/permanent",
  validateRequest(noteIdParamsSchema, "params"),
  permanentlyDeleteNoteController,
);

notesRouter.get(
  "/:noteId",
  validateRequest(noteIdParamsSchema, "params"),
  getNoteController,
);

notesRouter.patch(
  "/:noteId",
  validateRequest(noteIdParamsSchema, "params"),
  validateRequest(updateNoteSchema),
  updateNoteController,
);

notesRouter.delete(
  "/:noteId",
  validateRequest(noteIdParamsSchema, "params"),
  deleteNoteController,
);
