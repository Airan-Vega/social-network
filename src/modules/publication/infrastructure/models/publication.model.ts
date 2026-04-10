import mongoose, { Schema, Document } from "mongoose";
import { Attachment } from "../../domain/types/attachment";
import { attachmentSchema } from "./attachment.schema";

interface IPublicationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  text: string;
  attachments?: Attachment[];
}

const publicationSchema = new Schema<IPublicationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    attachments: {
      type: [attachmentSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const PublicationModel = mongoose.model<IPublicationDocument>(
  "Publication",
  publicationSchema,
);
