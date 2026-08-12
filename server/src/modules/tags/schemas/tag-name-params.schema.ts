import { z } from "zod";

import { NOTE_VALIDATION } from "../../notes/constants/note.constants.js";

export const tagNameParamsSchema = z.object({
  tagName: z
    .string()
    .trim()
    .min(1)
    .max(NOTE_VALIDATION.tagMaxLength),
});

export type TagNameParams = z.infer<typeof tagNameParamsSchema>;
