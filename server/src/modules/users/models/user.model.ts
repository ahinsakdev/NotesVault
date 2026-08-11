import { model, Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    avatarUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
