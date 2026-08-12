import { z } from "zod";

import { FOLDER_VALIDATION } from "../constants.js";

export const updateFolderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(FOLDER_VALIDATION.nameMaxLength),
});

export type UpdateFolderInput = z.infer<typeof updateFolderSchema>;
