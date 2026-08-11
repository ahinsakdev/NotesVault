import { z } from "zod";

import { AUTH_VALIDATION } from "../constants/auth.constants.js";

export const resetPasswordSchema = z.object({
  token: z.string().trim().min(1),

  password: z
    .string()
    .min(AUTH_VALIDATION.passwordMinLength)
    .max(AUTH_VALIDATION.passwordMaxLength)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/\d/),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
