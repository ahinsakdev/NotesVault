import { Router } from "express";

import { validateRequest } from "../../../shared/middleware/validate-request.js";
import { authenticate } from "../../auth/middleware/authenticate.js";
import {
  deleteTagController,
  renameTagController,
} from "../controllers/tags.controller.js";
import { renameTagSchema } from "../schemas/rename-tag.schema.js";
import { tagNameParamsSchema } from "../schemas/tag-name-params.schema.js";

export const tagsRouter = Router();

tagsRouter.use(authenticate);

tagsRouter.patch(
  "/:tagName",
  validateRequest(tagNameParamsSchema, "params"),
  validateRequest(renameTagSchema),
  renameTagController,
);

tagsRouter.delete(
  "/:tagName",
  validateRequest(tagNameParamsSchema, "params"),
  deleteTagController,
);
