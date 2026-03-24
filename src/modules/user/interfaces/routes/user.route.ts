import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";
import { bodyMiddleware } from "../../../../shared/middleware/body.middleware";
import { saveUserSchema } from "../validators/user.validator";
import { upload } from "../../infrastructure/config/multer.config";

export const createUserRouter = (controller: UserController) => {
  const router = Router();

  // protege todas las rutas de este router
  router.use(authMiddleware);

  router.get("/profile", (req, res, next) =>
    controller.getProfile(req, res, next),
  );

  router.get("/search", (req, res, next) =>
    controller.searchUsersByNick(req, res, next),
  );

  router.patch(
    "/update-profile",
    bodyMiddleware(saveUserSchema),
    (req, res, next) => controller.update(req, res, next),
  );

  router.patch(
    "/upload-image-profile",
    [upload.single("profileImage")],
    (req: Request, res: Response, next: NextFunction) =>
      controller.uploadImage(req, res, next),
  );

  return router;
};
