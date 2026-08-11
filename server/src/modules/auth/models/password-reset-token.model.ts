import {
  model,
  Schema,
  type InferSchemaType,
  type Types,
} from "mongoose";

const passwordResetTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: {
        expires: 0,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

passwordResetTokenSchema.index({
  userId: 1,
  createdAt: -1,
});

export type PasswordResetToken = InferSchemaType<
  typeof passwordResetTokenSchema
>;

export type PasswordResetTokenUserId = Types.ObjectId;

export const PasswordResetTokenModel = model(
  "PasswordResetToken",
  passwordResetTokenSchema,
);
