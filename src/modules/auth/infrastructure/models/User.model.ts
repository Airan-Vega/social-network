import mongoose, { Schema, Document } from "mongoose";

type Role = "admin" | "user";
export interface IUserDocument extends Document {
  email: string;
  password: string;
  isActive: boolean;
  role: Role;
  createdAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
