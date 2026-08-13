import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import { apiRouter } from "./routes/api-router.js";
import { AppError } from "./shared/errors/app-error.js";
import { errorHandler } from "./shared/middleware/error-handler.js";
import { notFoundHandler } from "./shared/middleware/not-found-handler.js";

import cookieParser from "cookie-parser";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");

  if (env.TRUST_PROXY_HOPS > 0) {
    app.set("trust proxy", env.TRUST_PROXY_HOPS);
  }

  app.use(helmet());

  app.use(
    cors({
      credentials: true,
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

  app.use(express.json({ limit: "10mb" }));
  app.use(cookieParser());

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
