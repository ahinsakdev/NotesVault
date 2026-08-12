import { Router } from "express";

import { authRouter } from "../modules/auth/routes/auth.routes.js";
import { foldersRouter } from "../modules/folders/routes/folders.routes.js";
import { notesRouter } from "../modules/notes/routes/notes.routes.js";
import { tagsRouter } from "../modules/tags/routes/tags.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "notesvault-api",
  });
});

apiRouter.use("/auth", authRouter);

apiRouter.use("/folders", foldersRouter);

apiRouter.use("/notes", notesRouter);

apiRouter.use("/tags", tagsRouter);
