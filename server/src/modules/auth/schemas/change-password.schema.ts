import { z } from "zod";

import { AUTH_VALIDATION } from "../constants/auth.constants.js";

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1)
    .max(AUTH_VALIDATION.passwordMaxLength),

  newPassword: z
    .string()
    .min(AUTH_VALIDATION.passwordMinLength)
    .max(AUTH_VALIDATION.passwordMaxLength)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/\d/),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
