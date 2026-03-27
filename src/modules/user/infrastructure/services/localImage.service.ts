import fs from "node:fs/promises";
import path from "node:path";

import { ImageService } from "../../application/services/image.service";
import { AppError } from "../../../../shared/utils";
import { ERROR_MESSAGES, HTTP_CODES } from "../../../../shared/constants";

export class LocalImageService implements ImageService {
  save(file: Express.Multer.File): string {
    const uploadsDir = path.join(process.cwd(), file.path);
    return uploadsDir;
  }

  async delete(imagePath: string): Promise<void> {
    try {
      await fs.unlink(imagePath);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // El archivo no existe → no pasa nada
        return;
      }
      throw new AppError(
        ERROR_MESSAGES.ERROR_DELETING_FILE,
        HTTP_CODES.SERVER_ERROR,
      );
    }
  }
}
