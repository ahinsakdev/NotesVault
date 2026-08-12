import { z } from "zod";

import { FOLDER_VALIDATION } from "../constants.js";

export const createFolderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(FOLDER_VALIDATION.nameMaxLength),
});

export type CreateFolderInput = z.infer<typeof createFolderSchema>;
