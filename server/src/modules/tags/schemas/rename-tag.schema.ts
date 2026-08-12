import { z } from "zod";

import { NOTE_VALIDATION } from "../../notes/constants/note.constants.js";

export const renameTagSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(NOTE_VALIDATION.tagMaxLength),
});

export type RenameTagInput = z.infer<typeof renameTagSchema>;
