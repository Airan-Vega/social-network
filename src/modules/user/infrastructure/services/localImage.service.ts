import path from "node:path";

import { ImageService } from "../../application/services/image.service";

export class LocalImageService implements ImageService {
  save(file: Express.Multer.File): string {
    const uploadsDir = path.join(process.cwd(), file.path);
    return uploadsDir;
  }
}
