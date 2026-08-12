import { Router } from "express";

import { validateRequest } from "../../../shared/middleware/validate-request.js";
import { authenticate } from "../../auth/middleware/authenticate.js";
import {
  createFolderController,
  deleteFolderController,
  getFolderController,
  getFoldersController,
  updateFolderController,
} from "../controllers/folders.controller.js";
import { createFolderSchema } from "../schemas/create-folder.schema.js";
import { folderIdParamsSchema } from "../schemas/folder-id-params.schema.js";
import { updateFolderSchema } from "../schemas/update-folder.schema.js";

export const foldersRouter = Router();

foldersRouter.use(authenticate);

foldersRouter.post(
  "/",
  validateRequest(createFolderSchema),
  createFolderController,
);

foldersRouter.get(
  "/",
  getFoldersController,
);

foldersRouter.get(
  "/:folderId",
  validateRequest(folderIdParamsSchema, "params"),
  getFolderController,
);

foldersRouter.patch(
  "/:folderId",
  validateRequest(folderIdParamsSchema, "params"),
  validateRequest(updateFolderSchema),
  updateFolderController,
);

foldersRouter.delete(
  "/:folderId",
  validateRequest(folderIdParamsSchema, "params"),
  deleteFolderController,
);
