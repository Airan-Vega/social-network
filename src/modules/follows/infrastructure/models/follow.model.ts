import { IUserDocument } from "@src/shared/models/user.model";
import mongoose, { model, Schema } from "mongoose";

export interface IFollowDocument extends Document {
  userId: mongoose.Types.ObjectId | IUserDocument; // Usuario que esta autenticado
  followedId: mongoose.Types.ObjectId | IUserDocument; // Persona a la que sigue el usuario autenticado
}

const followSchema = new Schema<IFollowDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    followedId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const FollowModel = model<IFollowDocument>("Follow", followSchema);
