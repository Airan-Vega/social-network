import { Schema, Document } from "mongoose";
import { Dimension, MimeType, Type } from "../../domain/types/attachment";

interface IAttachmentDocument extends Document {
  url: string;
  type: Type;
  size_bytes: number;
  mime_type: MimeType;
  dimensions?: Dimension;
}

export const attachmentSchema = new Schema<IAttachmentDocument>(
  {
    url: { type: String, required: true },
    type: { type: String, required: true },
    size_bytes: { type: Number, required: true },
    mime_type: { type: String, required: true },
    dimensions: {
      width: Number,
      height: Number,
    },
  },
  { _id: false },
);
