import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../../auth/types/authenticated-request.js";
import type { RenameTagInput } from "../schemas/rename-tag.schema.js";
import type { TagNameParams } from "../schemas/tag-name-params.schema.js";
import {
  deleteTagForUser,
  renameTagForUser,
} from "../services/tags.service.js";

export async function renameTagController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { tagName } = request.params as TagNameParams;
  const input = request.body as RenameTagInput;

  const result = await renameTagForUser(
    authenticatedRequest.user.id,
    tagName,
    input.name,
  );

  response.status(200).json(result);
}

export async function deleteTagController(
  request: Request,
  response: Response,
): Promise<void> {
  const authenticatedRequest = request as AuthenticatedRequest;
  const { tagName } = request.params as TagNameParams;

  const result = await deleteTagForUser(
    authenticatedRequest.user.id,
    tagName,
  );

  response.status(200).json(result);
}
