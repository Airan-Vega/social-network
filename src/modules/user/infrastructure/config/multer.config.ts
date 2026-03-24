import multer from "multer";
import path from "path";
import defaultConfig from "../../../../shared/config/default";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${defaultConfig.uploadFolder}/`); // carpeta local
  },
  filename: (req, file, cb) => {
    const uniqueName = req.user?.id; // Viene del middleware de autenticacion
    const ext = path.extname(file.originalname);

    cb(null, `${uniqueName}${ext}`);
  },
});

const fileFilter = (
  req: unknown,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG and WEBP are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
});
