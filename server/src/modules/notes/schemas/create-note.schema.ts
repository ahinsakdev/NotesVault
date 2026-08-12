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

export const createNoteSchema = z.object({
  title: z
    .string()
    .max(NOTE_VALIDATION.titleMaxLength)
    .default(""),

  content: noteContentSchema,

  folderName: z
    .string()
    .min(1)
    .max(NOTE_VALIDATION.folderNameMaxLength)
    .default("Notes"),

  tags: z
    .array(tagSchema)
    .max(NOTE_VALIDATION.maxTags)
    .default([]),

  accent: z
    .enum(NOTE_ACCENTS)
    .default("purple"),

  isPinned: z.boolean().default(false),

  isFavorite: z.boolean().default(false),

  isArchived: z.boolean().default(false),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
