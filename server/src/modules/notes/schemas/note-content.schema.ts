import { z } from "zod";

export const noteContentSchema: z.ZodType = z.lazy(() =>
  z.object({
    type: z.string().min(1).optional(),
    attrs: z.record(z.string(), z.unknown()).optional(),
    content: z.array(noteContentSchema).optional(),
    marks: z.array(noteContentSchema).optional(),
    text: z.string().optional(),
  }),
);

export type ValidatedNoteContent = z.infer<typeof noteContentSchema>;
