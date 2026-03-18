// infrastructure/models/TokenModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITokenDocument extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const tokenSchema = new Schema<ITokenDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const TokenModel = mongoose.model<ITokenDocument>("Token", tokenSchema);
