import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import { apiRouter } from "./routes/api-router.js";
import { AppError } from "./shared/errors/app-error.js";
import { errorHandler } from "./shared/middleware/error-handler.js";
import { notFoundHandler } from "./shared/middleware/not-found-handler.js";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");

  app.use(helmet());

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || origin === env.CLIENT_ORIGIN) {
          callback(null, true);
          return;
        }

        callback(
          new AppError(
            403,
            "Origin is not allowed by CORS",
            "CORS_ORIGIN_NOT_ALLOWED",
          ),
        );
      },
    }),
  );

  app.use(express.json());

  app.get("/health", (_request: Request, response: Response) => {
    response.status(200).json({
      status: "ok",
      service: "notesvault-api",
    });
  });

  app.use("/api/v1", apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
