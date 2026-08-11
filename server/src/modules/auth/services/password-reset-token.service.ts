import {
  createHash,
  randomBytes,
} from "node:crypto";

import { PASSWORD_RESET } from "../constants/password-reset.constants.js";

export function generatePasswordResetToken(): string {
  return randomBytes(PASSWORD_RESET.tokenBytes).toString("hex");
}

export function hashPasswordResetToken(token: string): string {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export function createPasswordResetExpiry(): Date {
  return new Date(
    Date.now() +
      PASSWORD_RESET.expiresInMinutes * 60 * 1000,
  );
}
