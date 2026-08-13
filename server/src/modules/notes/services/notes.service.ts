import { AppError } from "../../../shared/errors/app-error.js";
import { FolderModel } from "../../folders/models/folder.model.js";
import type { NoteAccent } from "../constants/note.constants.js";
import { NoteModel } from "../models/note.model.js";
import type { CreateNoteInput } from "../schemas/create-note.schema.js";
import type { SearchNotesQuery } from "../schemas/search-notes-query.schema.js";
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

function createFolderNotFoundError(): AppError {
  return new AppError(404, "Folder was not found", "FOLDER_NOT_FOUND");
}

async function resolveFolderForUser(
  userId: string,
  folderId: string,
) {
  const folder = await FolderModel.findOne({
    _id: folderId,
    userId,
  });

  if (!folder) {
    throw createFolderNotFoundError();
  }

  return folder;
}

export async function createNote(
  userId: string,
  input: CreateNoteInput,
): Promise<SerializedNote> {
  const content = input.content as NoteContentNode;

  const folder = input.folderId
    ? await resolveFolderForUser(userId, input.folderId)
    : null;

  const note = await NoteModel.create({
    userId,

    title: normalizeNoteTitle(input.title),

    content,

    preview: createNotePreview(content),

    folderId: folder?._id ?? null,

    folderName: folder
      ? folder.name
      : normalizeNoteFolderName(input.folderName),

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


export type NoteSearchMatchField =
  | "title"
  | "preview"
  | "folder"
  | "tag";

export type NoteSearchResult = {
  note: SerializedNote;
  matchedField: NoteSearchMatchField;
  score: number;
};

type NoteSearchCandidate = {
  field: NoteSearchMatchField;
  value: string;
  baseScore: number;
};

function normalizeSearchValue(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function getSearchCandidateScore(
  candidate: NoteSearchCandidate,
  normalizedQuery: string,
): number {
  const normalizedValue = normalizeSearchValue(candidate.value);

  if (normalizedValue === normalizedQuery) {
    return candidate.baseScore + 40;
  }

  if (normalizedValue.startsWith(normalizedQuery)) {
    return candidate.baseScore + 25;
  }

  if (normalizedValue.includes(normalizedQuery)) {
    return candidate.baseScore + 10;
  }

  return 0;
}

function getSearchCandidates(
  note: SerializedNote,
): NoteSearchCandidate[] {
  return [
    {
      field: "title",
      value: note.title,
      baseScore: 100,
    },
    {
      field: "preview",
      value: note.preview,
      baseScore: 45,
    },
    {
      field: "folder",
      value: note.folderName,
      baseScore: 60,
    },
    ...note.tags.map<NoteSearchCandidate>((tag) => ({
      field: "tag",
      value: tag,
      baseScore: 70,
    })),
  ];
}

function createNoteSearchResult(
  note: SerializedNote,
  normalizedQuery: string,
): NoteSearchResult | null {
  const candidateMatches = getSearchCandidates(note)
    .map((candidate) => ({
      field: candidate.field,
      score: getSearchCandidateScore(candidate, normalizedQuery),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((first, second) => second.score - first.score);

  const bestMatch = candidateMatches[0];

  if (!bestMatch) {
    return null;
  }

  return {
    note,
    matchedField: bestMatch.field,
    score: bestMatch.score,
  };
}

function sortNoteSearchResults(
  results: NoteSearchResult[],
  sort: SearchNotesQuery["sort"],
): NoteSearchResult[] {
  return [...results].sort((firstResult, secondResult) => {
    const first = firstResult.note;
    const second = secondResult.note;

    switch (sort) {
      case "updated-desc":
        return (
          new Date(second.updatedAt).getTime() -
          new Date(first.updatedAt).getTime()
        );

      case "updated-asc":
        return (
          new Date(first.updatedAt).getTime() -
          new Date(second.updatedAt).getTime()
        );

      case "created-desc":
        return (
          new Date(second.createdAt).getTime() -
          new Date(first.createdAt).getTime()
        );

      case "created-asc":
        return (
          new Date(first.createdAt).getTime() -
          new Date(second.createdAt).getTime()
        );

      case "title-asc":
        return first.title.localeCompare(second.title);

      case "title-desc":
        return second.title.localeCompare(first.title);

      case "relevance":
      default:
        if (firstResult.score !== secondResult.score) {
          return secondResult.score - firstResult.score;
        }

        return (
          new Date(second.updatedAt).getTime() -
          new Date(first.updatedAt).getTime()
        );
    }
  });
}

export async function searchNotesForUser(
  userId: string,
  query: SearchNotesQuery,
): Promise<NoteSearchResult[]> {
  const notes = await NoteModel.find({
    userId,
    deletedAt: null,
    isArchived: false,
    ...(query.folder ? { folderName: query.folder } : {}),
    ...(query.tag ? { tags: query.tag } : {}),
    ...(query.favoritesOnly ? { isFavorite: true } : {}),
    ...(query.pinnedOnly ? { isPinned: true } : {}),
  });

  const normalizedQuery = normalizeSearchValue(query.q);

  const results = notes
    .map((note) =>
      serializeNote({
        ...note.toObject(),
        content: note.content as NoteContentNode,
        accent: note.accent as NoteAccent,
      }),
    )
    .map((note) => createNoteSearchResult(note, normalizedQuery))
    .filter(
      (result): result is NoteSearchResult =>
        result !== null,
    );

  const sortedResults = sortNoteSearchResults(results, query.sort);

  return query.limit
    ? sortedResults.slice(0, query.limit)
    : sortedResults;
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

  if (input.folderId !== undefined) {
    if (input.folderId === null) {
      note.folderId = null;
      note.folderName = "Unfiled";
    } else {
      const folder = await resolveFolderForUser(userId, input.folderId);

      note.folderId = folder._id;
      note.folderName = folder.name;
    }
  } else if (input.folderName !== undefined) {
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
  note.isArchived = false;

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
