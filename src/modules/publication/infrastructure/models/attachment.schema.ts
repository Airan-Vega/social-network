import { Schema, Document } from "mongoose";
import { Dimension, MimeType } from "../../domain/types/attachment";

interface IAttachmentDocument extends Document {
  url: string;
  type: string;
  size_bytes: number;
  mime_type: MimeType;
  dimensions?: Dimension;
  duration_seconds?: number;
  is_looping?: boolean;
}

export const attachmentSchema = new Schema<IAttachmentDocument>({
  url: { type: String, required: true },
  type: { type: String, required: true },
  size_bytes: { type: Number, required: true },
  mime_type: { type: String, required: true },
  dimensions: {
    width: Number,
    height: Number,
  },
  duration_seconds: Number,
  is_looping: Boolean,
});
