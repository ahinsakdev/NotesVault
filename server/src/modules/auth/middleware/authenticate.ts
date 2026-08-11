import type { NextFunction, Request, Response } from "express";

import { env } from "../../../config/env.js";
import { AppError } from "../../../shared/errors/app-error.js";
import { UserModel } from "../../users/models/user.model.js";
import { serializeUser } from "../../users/utils/serialize-user.js";
import type { AuthenticatedRequest } from "../types/authenticated-request.js";
import { verifyAccessToken } from "../services/token.service.js";

export async function authenticate(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = request.cookies[env.AUTH_COOKIE_NAME] as unknown;

    if (typeof token !== "string" || !token) {
      throw new AppError(401, "Authentication required", "UNAUTHENTICATED");
    }

    let userId: string;

    try {
      const payload = verifyAccessToken(token);
      userId = payload.sub;
    } catch {
      throw new AppError(401, "Authentication required", "UNAUTHENTICATED");
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AppError(401, "Authentication required", "UNAUTHENTICATED");
    }

    (request as AuthenticatedRequest).user = serializeUser(user);

    next();
  } catch (error) {
    next(error);
  }
}
