import { NextFunction, Request, Response, Router } from "express";

import { FollowController } from "../controllers/follow.controller";
import { authMiddleware } from "@src/shared/middleware/auth.middleware";
import { bodyMiddleware } from "@src/shared/middleware/body.middleware";
import { addFollowSchema } from "../validators/follow.validator";

export const createFollowRouter = (controller: FollowController) => {
  const router = Router();

  // protege todas las rutas de este router
  router.use(authMiddleware);

  router.get("/list-followed", (req, res, next) =>
    controller.listFollowed(req, res, next),
  );

  router.get("/list-follower", (req, res, next) =>
    controller.listFollower(req, res, next),
  );

  router.post(
    "/add-followed",
    bodyMiddleware(addFollowSchema),
    (req, res, next) => controller.registerOneFollowed(req, res, next),
  );

  router.delete(
    "/unfollow/:followedId",
    (req: Request, res: Response, next: NextFunction) =>
      controller.unfollow(req, res, next),
  );

  return router;
};
