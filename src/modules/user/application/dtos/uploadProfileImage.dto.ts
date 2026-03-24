export interface UploadProfileImageDto {
  userId: string;
  file: Express.Multer.File;
}
