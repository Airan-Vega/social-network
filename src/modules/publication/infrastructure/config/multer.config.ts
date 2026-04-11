import multer from "multer";
import { AppError, createFolder, deleteFolder } from "../../../../shared/utils";
import { ERROR_MESSAGES, HTTP_CODES } from "../../../../shared/constants";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const publicationId = req.params.id;
    const pathFolder = `uploads/publications/${publicationId}`;
    deleteFolder(pathFolder);

    createFolder(pathFolder);

    cb(null, pathFolder); // carpeta local
  },
  filename: (req, file, cb) => {
    const uniqueName = file.originalname;

    cb(null, uniqueName);
  },
});

const fileFilter = (
  req: unknown,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = [
    // Imagenes
    "image/jpeg",
    "image/png",
    "image/webp",
    // Animaciones
    "image/gif",
    // Videos
    "video/mp4",
    "video/webm",
    // Documentos
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        ERROR_MESSAGES.INVALID_FILE_TYPE,
        HTTP_CODES.UNSUPPORTED_MEDIA_TYPE,
      ),
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  //limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
});
