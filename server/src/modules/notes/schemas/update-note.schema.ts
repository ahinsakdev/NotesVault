import { z } from "zod";

import {
  NOTE_ACCENTS,
  NOTE_VALIDATION,
} from "../constants/note.constants.js";
import { noteContentSchema } from "./note-content.schema.js";

const tagSchema = z
  .string()
  .min(1)
  .max(NOTE_VALIDATION.tagMaxLength);

export const updateNoteSchema = z
  .object({
    title: z
      .string()
      .max(NOTE_VALIDATION.titleMaxLength)
      .optional(),

    content: noteContentSchema.optional(),

    folderName: z
      .string()
      .min(1)
      .max(NOTE_VALIDATION.folderNameMaxLength)
      .optional(),

    tags: z
      .array(tagSchema)
      .max(NOTE_VALIDATION.maxTags)
      .optional(),

    accent: z.enum(NOTE_ACCENTS).optional(),

    isPinned: z.boolean().optional(),

    isFavorite: z.boolean().optional(),

    isArchived: z.boolean().optional(),
  })
  .refine(
    (input) => Object.keys(input).length > 0,
    {
      message: "At least one note field must be provided",
    },
  );

export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
