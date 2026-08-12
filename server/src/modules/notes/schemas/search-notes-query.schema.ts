import { z } from "zod";

const booleanQuerySchema = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

export const searchNotesQuerySchema = z.object({
  q: z.string().trim().min(1).max(200),

  folder: z.string().trim().min(1).max(100).optional(),

  tag: z.string().trim().min(1).max(50).optional(),

  favoritesOnly: booleanQuerySchema.optional(),

  pinnedOnly: booleanQuerySchema.optional(),

  limit: z.coerce.number().int().min(1).max(100).optional(),

  sort: z
    .enum([
      "relevance",
      "updated-desc",
      "updated-asc",
      "created-desc",
      "created-asc",
      "title-asc",
      "title-desc",
    ])
    .default("relevance"),
});

export type SearchNotesQuery = z.infer<typeof searchNotesQuerySchema>;
