import { AppError } from "../../../shared/errors/app-error.js";
import type { NoteAccent } from "../constants/note.constants.js";
import { NoteModel } from "../models/note.model.js";
import type { CreateNoteInput } from "../schemas/create-note.schema.js";
import type { UpdateNoteInput } from "../schemas/update-note.schema.js";
import type { NoteContentNode } from "../types/note-content.types.js";
import {
  normalizeNoteFolderName,
  normalizeNoteTags,
  normalizeNoteTitle,
} from "../utils/note-input.utils.js";
import { createNotePreview } from "../utils/note-content.utils.js";
import { serializeNote, type SerializedNote } from "../utils/serialize-note.js";

function createNoteNotFoundError(): AppError {
  return new AppError(404, "Note was not found", "NOTE_NOT_FOUND");
}

export async function createNote(
  userId: string,
  input: CreateNoteInput,
): Promise<SerializedNote> {
  const content = input.content as NoteContentNode;

  const note = await NoteModel.create({
    userId,

    title: normalizeNoteTitle(input.title),

    content,

    preview: createNotePreview(content),

    folderName: normalizeNoteFolderName(input.folderName),

    tags: normalizeNoteTags(input.tags),

    accent: input.accent,

    isPinned: input.isPinned,

    isFavorite: input.isFavorite,

    isArchived: input.isArchived,

    deletedAt: null,
  });

  return serializeNote({
    ...note.toObject(),
    content: note.content as NoteContentNode,
    accent: note.accent as NoteAccent,
  });
}

export async function getNotesForUser(
  userId: string,
): Promise<SerializedNote[]> {
  const notes = await NoteModel.find({
    userId,
    deletedAt: null,
    isArchived: false,
  }).sort({
    updatedAt: -1,
  });

  return notes.map((note) =>
    serializeNote({
      ...note.toObject(),
      content: note.content as NoteContentNode,
      accent: note.accent as NoteAccent,
    }),
  );
}

export async function getArchivedNotesForUser(
  userId: string,
): Promise<SerializedNote[]> {
  const notes = await NoteModel.find({
    userId,
    deletedAt: null,
    isArchived: true,
  }).sort({
    updatedAt: -1,
  });

  return notes.map((note) =>
    serializeNote({
      ...note.toObject(),
      content: note.content as NoteContentNode,
      accent: note.accent as NoteAccent,
    }),
  );
}

export async function getTrashNotesForUser(
  userId: string,
): Promise<SerializedNote[]> {
  const notes = await NoteModel.find({
    userId,
    deletedAt: { $ne: null },
  }).sort({
    deletedAt: -1,
  });

  return notes.map((note) =>
    serializeNote({
      ...note.toObject(),
      content: note.content as NoteContentNode,
      accent: note.accent as NoteAccent,
    }),
  );
}

export async function getNoteForUser(
  userId: string,
  noteId: string,
): Promise<SerializedNote> {
  const note = await NoteModel.findOne({
    _id: noteId,
    userId,
    deletedAt: null,
  });

  if (!note) {
    throw createNoteNotFoundError();
  }

  return serializeNote({
    ...note.toObject(),
    content: note.content as NoteContentNode,
    accent: note.accent as NoteAccent,
  });
}

export async function updateNoteForUser(
  userId: string,
  noteId: string,
  input: UpdateNoteInput,
): Promise<SerializedNote> {
  const note = await NoteModel.findOne({
    _id: noteId,
    userId,
    deletedAt: null,
  });

  if (!note) {
    throw createNoteNotFoundError();
  }

  if (input.title !== undefined) {
    note.title = normalizeNoteTitle(input.title);
  }

  if (input.content !== undefined) {
    const content = input.content as NoteContentNode;

    note.content = content;
    note.preview = createNotePreview(content);
  }

  if (input.folderName !== undefined) {
    note.folderName = normalizeNoteFolderName(input.folderName);
  }

  if (input.tags !== undefined) {
    note.tags = normalizeNoteTags(input.tags);
  }

  if (input.accent !== undefined) {
    note.accent = input.accent;
  }

  if (input.isPinned !== undefined) {
    note.isPinned = input.isPinned;
  }

  if (input.isFavorite !== undefined) {
    note.isFavorite = input.isFavorite;
  }

  if (input.isArchived !== undefined) {
    note.isArchived = input.isArchived;
  }

  await note.save();

  return serializeNote({
    ...note.toObject(),
    content: note.content as NoteContentNode,
    accent: note.accent as NoteAccent,
  });
}

export async function deleteNoteForUser(
  userId: string,
  noteId: string,
): Promise<void> {
  const note = await NoteModel.findOne({
    _id: noteId,
    userId,
  });

  if (!note) {
    throw createNoteNotFoundError();
  }

  if (!note.deletedAt) {
    note.deletedAt = new Date();

    await note.save();
  }
}

export async function restoreNoteForUser(
  userId: string,
  noteId: string,
): Promise<SerializedNote> {
  const note = await NoteModel.findOne({
    _id: noteId,
    userId,
    deletedAt: { $ne: null },
  });

  if (!note) {
    throw createNoteNotFoundError();
  }

  note.deletedAt = null;

  await note.save();

  return serializeNote({
    ...note.toObject(),
    content: note.content as NoteContentNode,
    accent: note.accent as NoteAccent,
  });
}

export async function permanentlyDeleteNoteForUser(
  userId: string,
  noteId: string,
): Promise<void> {
  const note = await NoteModel.findOneAndDelete({
    _id: noteId,
    userId,
    deletedAt: { $ne: null },
  });

  if (!note) {
    throw createNoteNotFoundError();
  }
}

export async function emptyTrashForUser(
  userId: string,
): Promise<number> {
  const result = await NoteModel.deleteMany({
    userId,
    deletedAt: { $ne: null },
  });

  return result.deletedCount;
}
