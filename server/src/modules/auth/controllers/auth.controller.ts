import type { Request, Response } from "express";

import { env } from "../../../config/env.js";
import type { AuthenticatedRequest } from "../types/authenticated-request.js";
import type { ForgotPasswordInput } from "../schemas/forgot-password.schema.js";
import type { LoginInput } from "../schemas/login.schema.js";
import type { SignupInput } from "../schemas/signup.schema.js";
import {
  loginUser,
  requestPasswordReset,
  resetUserPassword,
  signupUser,
} from "../services/auth.service.js";
import {
  clearSessionCookie,
  setSessionCookie,
} from "../services/session-cookie.service.js";

import { createAccessToken } from "../services/token.service.js";
import type { ResetPasswordInput } from "../schemas/reset-password.schema.js";

export async function signup(
  request: Request,
  response: Response,
): Promise<void> {
  const input = request.body as SignupInput;

  const user = await signupUser(input);

  const accessToken = createAccessToken(user.id, false);

  setSessionCookie(response, accessToken, false);

  response.status(201).json({
    user,
  });
}

export async function login(
  request: Request,
  response: Response,
): Promise<void> {
  const input = request.body as LoginInput;

  const user = await loginUser(input);

  const accessToken = createAccessToken(user.id, input.rememberMe);

  setSessionCookie(response, accessToken, input.rememberMe);

  response.status(200).json({
    user,
  });
}

export function getCurrentUser(request: Request, response: Response): void {
  const authenticatedRequest = request as AuthenticatedRequest;

  response.status(200).json({
    user: authenticatedRequest.user,
  });
}

export function logout(_request: Request, response: Response): void {
  clearSessionCookie(response);

  response.status(204).send();
}

export async function forgotPassword(
  request: Request,
  response: Response,
): Promise<void> {
  const input = request.body as ForgotPasswordInput;

  const token = await requestPasswordReset(input);

  if (token && env.NODE_ENV === "development") {
    const resetUrl = `${env.CLIENT_ORIGIN}/reset-password/${encodeURIComponent(token)}`;

    console.log(`NotesVault password reset link: ${resetUrl}`);
  }

  response.status(200).json({
    message:
      "If an account exists for this email, a password reset link has been sent.",
  });
}

export async function resetPassword(
  request: Request,
  response: Response,
): Promise<void> {
  const input = request.body as ResetPasswordInput;

  await resetUserPassword(input);

  clearSessionCookie(response);

  response.status(200).json({
    message: "Password reset successfully.",
  });
}