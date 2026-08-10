import { z } from "zod";

import { AUTH_VALIDATION } from "@/features/authentication/constants/authentication.constants";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required.")
      .min(
        AUTH_VALIDATION.nameMinLength,
        `First name must be at least ${AUTH_VALIDATION.nameMinLength} characters.`,
      )
      .max(
        AUTH_VALIDATION.nameMaxLength,
        `First name must not exceed ${AUTH_VALIDATION.nameMaxLength} characters.`,
      ),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required.")
      .min(
        AUTH_VALIDATION.nameMinLength,
        `Last name must be at least ${AUTH_VALIDATION.nameMinLength} characters.`,
      )
      .max(
        AUTH_VALIDATION.nameMaxLength,
        `Last name must not exceed ${AUTH_VALIDATION.nameMaxLength} characters.`,
      ),

    email: z
      .string()
      .trim()
      .min(1, "Email address is required.")
      .email("Enter a valid email address."),

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

    acceptedTerms: z.boolean().refine((value) => value, {
      message: "You must accept the Terms and Privacy Policy.",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
