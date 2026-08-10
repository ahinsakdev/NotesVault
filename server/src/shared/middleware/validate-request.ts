import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

import { AppError } from "../errors/app-error.js";

type RequestTarget = "body" | "params" | "query";

export function validateRequest(
  schema: ZodType,
  target: RequestTarget = "body",
) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    const result = schema.safeParse(request[target]);

    if (!result.success) {
      next(new AppError(400, "Request validation failed", "VALIDATION_ERROR"));

      return;
    }

    next();
  };
}
