import { Router } from "express";
import { PublicationController } from "../controllers/publication.controller";
import { authMiddleware } from "@src/shared/middleware/auth.middleware";
import { bodyMiddleware } from "@src/shared/middleware/body.middleware";
import { addPublicationSchema } from "../validators/publication.validator";

export const createPublicationRouter = (controller: PublicationController) => {
  const router = Router();

  // protege todas las rutas de este router
  router.use(authMiddleware);

  router.post(
    "/create",
    bodyMiddleware(addPublicationSchema),
    (req, res, next) => controller.createPublication(req, res, next),
  );

  router.get("/get-all-one-user", (req, res, next) =>
    controller.getPublications(req, res, next),
  );

  router.patch(
    "/update/:id",
    bodyMiddleware(addPublicationSchema),
    (req, res, next) => controller.updatePublication(req, res, next),
  );

  router.delete("/delete/:id", (req, res, next) =>
    controller.deletePublication(req, res, next),
  );

  return router;
};
