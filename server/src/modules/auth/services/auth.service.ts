import { AppError } from "../../../shared/errors/app-error.js";
import { UserModel } from "../../users/models/user.model.js";
import {
  serializeUser,
  type AuthenticatedUser,
} from "../../users/utils/serialize-user.js";
import type { LoginInput } from "../schemas/login.schema.js";
import type { SignupInput } from "../schemas/signup.schema.js";
import { hashPassword, verifyPassword } from "./password.service.js";

import type { ForgotPasswordInput } from "../schemas/forgot-password.schema.js";
import { PasswordResetTokenModel } from "../models/password-reset-token.model.js";
import {
  createPasswordResetExpiry,
  generatePasswordResetToken,
  hashPasswordResetToken,
} from "./password-reset-token.service.js";

import type { ResetPasswordInput } from "../schemas/reset-password.schema.js";

export async function signupUser(
  input: SignupInput,
): Promise<AuthenticatedUser> {
  const existingUser = await UserModel.exists({
    email: input.email,
  });

  if (existingUser) {
    throw new AppError(
      409,
      "An account with this email already exists",
      "EMAIL_ALREADY_IN_USE",
    );
  }

  const passwordHash = await hashPassword(input.password);

  try {
    const user = await UserModel.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      passwordHash,
      avatarUrl: null,
    });

    return serializeUser(user);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      throw new AppError(
        409,
        "An account with this email already exists",
        "EMAIL_ALREADY_IN_USE",
      );
    }

    throw error;
  }
}

export async function loginUser(input: LoginInput): Promise<AuthenticatedUser> {
  const user = await UserModel.findOne({
    email: input.email,
  }).select("+passwordHash");

  if (!user) {
    throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  const isPasswordValid = await verifyPassword(
    input.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  return serializeUser(user);
}

export async function requestPasswordReset(
  input: ForgotPasswordInput,
): Promise<string | null> {
  const user = await UserModel.findOne({
    email: input.email,
  });

  if (!user) {
    return null;
  }

  await PasswordResetTokenModel.deleteMany({
    userId: user._id,
  });

  const token = generatePasswordResetToken();
  const tokenHash = hashPasswordResetToken(token);

  await PasswordResetTokenModel.create({
    userId: user._id,
    tokenHash,
    expiresAt: createPasswordResetExpiry(),
  });

  return token;
}

export async function resetUserPassword(
  input: ResetPasswordInput,
): Promise<void> {
  const tokenHash = hashPasswordResetToken(input.token);

  const resetToken = await PasswordResetTokenModel.findOne({
    tokenHash,
    expiresAt: {
      $gt: new Date(),
    },
  });

  if (!resetToken) {
    throw new AppError(
      400,
      "Password reset link is invalid or has expired",
      "INVALID_OR_EXPIRED_RESET_TOKEN",
    );
  }

  const user = await UserModel.findById(resetToken.userId).select(
    "+passwordHash",
  );

  if (!user) {
    await PasswordResetTokenModel.deleteOne({
      _id: resetToken._id,
    });

    throw new AppError(
      400,
      "Password reset link is invalid or has expired",
      "INVALID_OR_EXPIRED_RESET_TOKEN",
    );
  }

  const isSamePassword = await verifyPassword(
    input.password,
    user.passwordHash,
  );

  if (isSamePassword) {
    throw new AppError(
      400,
      "New password must be different from your current password",
      "PASSWORD_REUSE_NOT_ALLOWED",
    );
  }

  user.passwordHash = await hashPassword(input.password);

  await user.save();

  await PasswordResetTokenModel.deleteMany({
    userId: user._id,
  });
}