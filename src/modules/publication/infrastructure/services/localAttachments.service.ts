import path from "node:path";

import { AttachmentService } from "../../application/services/attachment.service";
import { Attachment } from "../../domain/types/attachment";
import sharp from "sharp";

const IMAGE = "image";
const VIDEO = "video";
const DOCUMENT = "application";

export class LocalAttachmentsService implements AttachmentService {
  async save(attachments: Express.Multer.File[]): Promise<Attachment[]> {
    const fileDatas = (await Promise.all(
      attachments.map(async (file) => {
        const baseFile = {
          url: path.join(process.cwd(), file.path),
          size_bytes: file.size,
          mime_type: file.mimetype,
        };

        if (file.mimetype.includes(IMAGE)) {
          const { width, height } = await sharp(file.path).metadata();
          return {
            ...baseFile,
            type: IMAGE,
            dimensions: { width, height },
          };
        }

        if (file.mimetype.includes(VIDEO)) {
          return {
            ...baseFile,
            type: VIDEO,
          };
        }

        if (file.mimetype.includes(DOCUMENT)) {
          return {
            ...baseFile,
            type: DOCUMENT,
          };
        }
        return baseFile;
      }),
    )) as Attachment[];

    return fileDatas;
  }
}
