import { Attachment } from "../../domain/types/attachment";

export interface AttachmentService {
  save(attachments: Express.Multer.File[]): Promise<Attachment[]>;
}
