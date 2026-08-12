import { AppError } from "../../../shared/errors/app-error.js";
import { NoteModel } from "../../notes/models/note.model.js";
import { FolderModel } from "../models/folder.model.js";
import type { CreateFolderInput } from "../schemas/create-folder.schema.js";
import type { UpdateFolderInput } from "../schemas/update-folder.schema.js";
import {
  serializeFolder,
  type SerializedFolder,
} from "../utils/serialize-folder.js";

type MongoDuplicateKeyError = {
  code: number;
};

function isMongoDuplicateKeyError(
  error: unknown,
): error is MongoDuplicateKeyError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

function createFolderNotFoundError(): AppError {
  return new AppError(404, "Folder was not found", "FOLDER_NOT_FOUND");
}

function createFolderConflictError(): AppError {
  return new AppError(
    409,
    "A folder with this name already exists",
    "FOLDER_ALREADY_EXISTS",
  );
}

function normalizeFolderName(name: string): string {
  return name.trim();
}

export async function createFolder(
  userId: string,
  input: CreateFolderInput,
): Promise<SerializedFolder> {
  try {
    const folder = await FolderModel.create({
      userId,
      name: normalizeFolderName(input.name),
    });

    return serializeFolder(folder);
  } catch (error) {
    if (isMongoDuplicateKeyError(error)) {
      throw createFolderConflictError();
    }

    throw error;
  }
}

export async function getFoldersForUser(
  userId: string,
): Promise<SerializedFolder[]> {
  const folders = await FolderModel.find({
    userId,
  }).sort({
    name: 1,
  });

  return folders.map(serializeFolder);
}

export async function getFolderForUser(
  userId: string,
  folderId: string,
): Promise<SerializedFolder> {
  const folder = await FolderModel.findOne({
    _id: folderId,
    userId,
  });

  if (!folder) {
    throw createFolderNotFoundError();
  }

  return serializeFolder(folder);
}

export async function updateFolderForUser(
  userId: string,
  folderId: string,
  input: UpdateFolderInput,
): Promise<SerializedFolder> {
  const folder = await FolderModel.findOne({
    _id: folderId,
    userId,
  });

  if (!folder) {
    throw createFolderNotFoundError();
  }

  const normalizedName = normalizeFolderName(input.name);

  folder.name = normalizedName;

  try {
    await folder.save();
  } catch (error) {
    if (isMongoDuplicateKeyError(error)) {
      throw createFolderConflictError();
    }

    throw error;
  }

  await NoteModel.updateMany(
    {
      userId,
      folderId: folder._id,
    },
    {
      $set: {
        folderName: normalizedName,
      },
    },
  );

  return serializeFolder(folder);
}

export async function deleteFolderForUser(
  userId: string,
  folderId: string,
): Promise<void> {
  const folder = await FolderModel.findOne({
    _id: folderId,
    userId,
  });

  if (!folder) {
    throw createFolderNotFoundError();
  }

  await NoteModel.updateMany(
    {
      userId,
      folderId: folder._id,
    },
    {
      $set: {
        folderId: null,
        folderName: "Unfiled",
      },
    },
  );

  await folder.deleteOne();
}
