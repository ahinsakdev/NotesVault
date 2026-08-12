import { Router } from "express";

import { authRouter } from "../modules/auth/routes/auth.routes.js";
import { notesRouter } from "../modules/notes/routes/notes.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "notesvault-api",
  });
});

apiRouter.use("/auth", authRouter);

apiRouter.use("/notes", notesRouter);
