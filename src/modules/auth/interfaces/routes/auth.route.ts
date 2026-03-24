import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
  authCredentialsSchema,
  renewTokenSchema,
} from "../validators/auth.validator";
import { bodyMiddleware } from "../../../../shared/middleware/body.middleware";
import { authMiddleware } from "../../../../shared/middleware/auth.middleware";
import { adminMiddleware } from "../../../../shared/middleware/admin.middleware";

export const createAuthRouter = (controller: AuthController) => {
  const router = Router();

  router.post(
    "/register",
    bodyMiddleware(authCredentialsSchema),
    (req, res, next) => controller.register(req, res, next),
  );

  router.post(
    "/login",
    bodyMiddleware(authCredentialsSchema),
    (req, res, next) => controller.login(req, res, next),
  );

  router.post(
    "/renew-token",
    bodyMiddleware(renewTokenSchema),
    (req, res, next) => controller.renew(req, res, next),
  );

  router.patch(
    "/is-active/:id",
    [authMiddleware, adminMiddleware],
    (req: Request, res: Response, next: NextFunction) =>
      controller.updateIsActive(req, res, next),
  );

  router.delete(
    "/logout",
    [authMiddleware],
    (req: Request, res: Response, next: NextFunction) =>
      controller.logout(req, res, next), // Se tiene que hacer asi porque sino el "this", no sería mi instancia de controlador
  );

  return router;
};
