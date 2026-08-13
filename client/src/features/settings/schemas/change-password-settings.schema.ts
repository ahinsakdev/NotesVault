import { z } from "zod";

import { AUTH_VALIDATION } from "@/features/authentication/constants/authentication.constants";

export const changePasswordSettingsSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),

    newPassword: z
      .string()
      .min(1, "New password is required.")
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

    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine(
    (values) => values.newPassword === values.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

export type ChangePasswordSettingsFormValues = z.infer<
  typeof changePasswordSettingsSchema
>;
