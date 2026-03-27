export interface ImageService {
  save(file: Express.Multer.File): string;
}
