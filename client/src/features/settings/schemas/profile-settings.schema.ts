import { z } from "zod";

export const profileSettingsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name must be 50 characters or fewer."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name must be 50 characters or fewer."),

  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Enter a valid email address."),
});

export type ProfileSettingsFormValues = z.infer<
  typeof profileSettingsSchema
>;
