import {
  model,
  Schema,
  type InferSchemaType,
} from "mongoose";

import {
  NOTE_ACCENTS,
  NOTE_VALIDATION,
} from "../constants/note.constants.js";

const noteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: NOTE_VALIDATION.titleMaxLength,
      default: "",
    },

    content: {
      type: Schema.Types.Mixed,
      required: true,
    },

    preview: {
      type: String,
      maxlength: NOTE_VALIDATION.previewMaxLength,
      default: "",
    },

    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
      index: true,
    },

    folderName: {
      type: String,
      trim: true,
      maxlength: NOTE_VALIDATION.folderNameMaxLength,
      default: "Unfiled",
    },

    tags: {
      type: [String],
      default: [],
    },

    accent: {
      type: String,
      enum: NOTE_ACCENTS,
      default: "purple",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

noteSchema.index({
  userId: 1,
  updatedAt: -1,
});

noteSchema.index({
  userId: 1,
  folderId: 1,
  updatedAt: -1,
});

noteSchema.index({
  userId: 1,
  deletedAt: 1,
  updatedAt: -1,
});

noteSchema.index({
  userId: 1,
  isPinned: 1,
  updatedAt: -1,
});

noteSchema.index({
  userId: 1,
  isFavorite: 1,
  updatedAt: -1,
});

export type NoteDocument = InferSchemaType<typeof noteSchema>;

export const NoteModel = model("Note", noteSchema);
