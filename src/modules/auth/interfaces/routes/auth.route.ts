import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
  authCredentialsSchema,
  renewTokenSchema,
} from "../validators/auth.validator";
import { bodyMiddleware } from "../middlewares/body.middleware";

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

  router.delete("/logout", (req, res, next) =>
    controller.logout(req, res, next),
  );

  return router;
};
