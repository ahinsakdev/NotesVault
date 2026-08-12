import { z } from "zod";

export const folderIdParamsSchema = z.object({
  folderId: z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid folder ID"),
});

export type FolderIdParams = z.infer<typeof folderIdParamsSchema>;
