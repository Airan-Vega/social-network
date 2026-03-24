import fs from "node:fs/promises";
import path from "node:path";

import { ImageService } from "../../application/services/image.service";

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
      throw new Error("Error deleting the file");
    }
  }
}
