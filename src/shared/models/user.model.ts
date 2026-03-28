import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../enums";

export interface IUserDocument extends Document {
  email: string;
  password: string;
  isActive: boolean;
  role: Role;
  name?: string;
  surname?: string;
  nick?: string;
  image?: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: [Role.ADMIN, Role.USER], default: Role.USER },
    isActive: { type: Boolean, default: true },
    name: { type: String },
    surname: { type: String },
    nick: { type: String, unique: true, sparse: true },
    image: { type: String },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
