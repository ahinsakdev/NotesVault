import { z } from "zod";

export const noteIdParamsSchema = z.object({
  noteId: z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid note ID"),
});

export type NoteIdParams = z.infer<typeof noteIdParamsSchema>;
