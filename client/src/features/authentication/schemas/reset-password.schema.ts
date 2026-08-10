import { z } from "zod";

import { AUTH_VALIDATION } from "@/features/authentication/constants/authentication.constants";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required.")
      .min(
        AUTH_VALIDATION.passwordMinLength,
        `Password must be at least ${AUTH_VALIDATION.passwordMinLength} characters.`,
      )
      .max(
        AUTH_VALIDATION.passwordMaxLength,
        `Password must not exceed ${AUTH_VALIDATION.passwordMaxLength} characters.`,
      )
      .regex(/[a-z]/, "Password must include a lowercase letter.")
      .regex(/[A-Z]/, "Password must include an uppercase letter.")
      .regex(/\d/, "Password must include a number."),

    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
