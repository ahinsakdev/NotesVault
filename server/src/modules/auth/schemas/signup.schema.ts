import { z } from "zod";

import { AUTH_VALIDATION } from "../constants/auth.constants.js";

export const signupSchema = z.object({
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

  password: z
    .string()
    .min(AUTH_VALIDATION.passwordMinLength)
    .max(AUTH_VALIDATION.passwordMaxLength)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/\d/),
});

export type SignupInput = z.infer<typeof signupSchema>;
