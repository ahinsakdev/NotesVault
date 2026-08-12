import { model, Schema, type InferSchemaType } from "mongoose";

import { FOLDER_VALIDATION } from "../constants.js";

const folderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: FOLDER_VALIDATION.nameMaxLength,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

folderSchema.index(
  {
    userId: 1,
    name: 1,
  },
  {
    unique: true,
  },
);

folderSchema.index({
  userId: 1,
  updatedAt: -1,
});

export type FolderDocument = InferSchemaType<typeof folderSchema>;

export const FolderModel = model("Folder", folderSchema);
