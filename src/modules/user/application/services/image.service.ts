export interface ImageService {
  save(file: Express.Multer.File): string;
  delete(imagePath: string): Promise<void>;
}
