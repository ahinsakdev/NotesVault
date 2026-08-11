import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

import { env } from "../../../config/env.js";
import { SESSION_DURATION } from "../constants/session.constants.js";

type AccessTokenPayload = JwtPayload & {
  sub: string;
};

export function createAccessToken(userId: string, rememberMe: boolean): string {
  const expiresIn: SignOptions["expiresIn"] = rememberMe
    ? SESSION_DURATION.remembered
    : SESSION_DURATION.default;

  return jwt.sign({}, env.JWT_SECRET, {
    subject: userId,
    expiresIn,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const payload = jwt.verify(token, env.JWT_SECRET);

  if (
    typeof payload === "string" ||
    typeof payload.sub !== "string" ||
    !payload.sub
  ) {
    throw new Error("Invalid access token payload");
  }

  return payload as AccessTokenPayload;
}
