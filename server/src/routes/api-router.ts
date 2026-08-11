import { Router } from "express";

import { authRouter } from "../modules/auth/routes/auth.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "notesvault-api",
  });
});

apiRouter.use("/auth", authRouter);
