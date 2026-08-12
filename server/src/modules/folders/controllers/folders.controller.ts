import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../../auth/types/authenticated-request.js";
import type { CreateFolderInput } from "../schemas/create-folder.schema.js";
import type { FolderIdParams } from "../schemas/folder-id-params.schema.js";
import type { UpdateFolderInput } from "../schemas/update-folder.schema.js";
import {
  createFolder,
  deleteFolderForUser,
  getFolderForUser,
  getFoldersForUser,
  updateFolderForUser,
} from "../services/folders.service.js";

export async function createFolderController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const input = request.body as CreateFolderInput;

  const folder = await createFolder(authenticatedRequest.user.id, input);

  response.status(201).json({
    folder,
  });
}

export async function getFoldersController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;

  const folders = await getFoldersForUser(authenticatedRequest.user.id);

  response.status(200).json({
    folders,
  });
}

export async function getFolderController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { folderId } = request.params as FolderIdParams;

  const folder = await getFolderForUser(
    authenticatedRequest.user.id,
    folderId,
  );

  response.status(200).json({
    folder,
  });
}

export async function updateFolderController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { folderId } = request.params as FolderIdParams;
  const input = request.body as UpdateFolderInput;

  const folder = await updateFolderForUser(
    authenticatedRequest.user.id,
    folderId,
    input,
  );

  response.status(200).json({
    folder,
  });
}

export async function deleteFolderController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { folderId } = request.params as FolderIdParams;

  await deleteFolderForUser(authenticatedRequest.user.id, folderId);

  response.status(204).send();
}
