import "dotenv/config";

import { z } from "zod";

const DEFAULT_CLIENT_ORIGIN = "http://localhost:5175";

const optionalUrl = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === ""
      ? undefined
      : value,
  z.url().optional(),
);

const environmentSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    PORT: z.coerce.number().int().positive().max(65535).default(4100),

    TRUST_PROXY_HOPS: z.coerce
      .number()
      .int()
      .min(0)
      .max(10)
      .default(0),

    CLIENT_ORIGIN: optionalUrl,

    JWT_SECRET: z
      .string()
      .min(32, "JWT_SECRET must contain at least 32 characters"),

    AUTH_COOKIE_NAME: z.string().trim().min(1).default("notesvault_session"),

    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  })
  .superRefine((environment, context) => {
    if (environment.NODE_ENV !== "production") {
      return;
    }

    if (!environment.CLIENT_ORIGIN) {
      context.addIssue({
        code: "custom",
        path: ["CLIENT_ORIGIN"],
        message: "CLIENT_ORIGIN is required in production",
      });

      return;
    }

    const clientOrigin = new URL(environment.CLIENT_ORIGIN);

    if (
      clientOrigin.hostname === "localhost" ||
      clientOrigin.hostname === "127.0.0.1"
    ) {
      context.addIssue({
        code: "custom",
        path: ["CLIENT_ORIGIN"],
        message: "CLIENT_ORIGIN cannot use localhost in production",
      });
    }
  })
  .transform((environment) => ({
    ...environment,
    CLIENT_ORIGIN: environment.CLIENT_ORIGIN ?? DEFAULT_CLIENT_ORIGIN,
  }));

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  console.error("Invalid environment configuration:");

  for (const issue of parsedEnvironment.error.issues) {
    const path = issue.path.length > 0 ? issue.path.join(".") : "environment";

    console.error(`- ${path}: ${issue.message}`);
  }

  process.exit(1);
}

export const env = parsedEnvironment.data;
