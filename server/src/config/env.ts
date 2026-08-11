import "dotenv/config";

import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive().max(65535).default(4100),

  CLIENT_ORIGIN: z.url().default("http://localhost:5175"),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must contain at least 32 characters"),

  AUTH_COOKIE_NAME: z.string().trim().min(1).default("notesvault_session"),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
});

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  console.error(
    "Invalid environment configuration:",
    z.treeifyError(parsedEnvironment.error),
  );

  process.exit(1);
}

export const env = parsedEnvironment.data;
