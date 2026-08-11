import type { Response } from "express";

import { env } from "../../../config/env.js";
import { SESSION_MAX_AGE } from "../constants/session.constants.js";

function getCookieMaxAge(rememberMe: boolean): number {
  return rememberMe ? SESSION_MAX_AGE.remembered : SESSION_MAX_AGE.default;
}

export function setSessionCookie(
  response: Response,
  token: string,
  rememberMe: boolean,
): void {
  response.cookie(env.AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: getCookieMaxAge(rememberMe),
    path: "/",
  });
}

export function clearSessionCookie(response: Response): void {
  response.clearCookie(env.AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}
