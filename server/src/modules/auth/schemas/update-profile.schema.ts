import { z } from "zod";

import { AUTH_VALIDATION } from "../constants/auth.constants.js";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(AUTH_VALIDATION.nameMinLength)
    .max(AUTH_VALIDATION.nameMaxLength),

  lastName: z
    .string()
    .trim()
    .min(AUTH_VALIDATION.nameMinLength)
    .max(AUTH_VALIDATION.nameMaxLength),

  email: z
    .string()
    .trim()
    .email()
    .transform((value) => value.toLowerCase()),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
