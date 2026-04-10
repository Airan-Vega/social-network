import { Router } from "express";
import { authRouter } from "./modules/auth/container";
import { userRouter } from "./modules/user/container";
import { followRouter } from "./modules/follows/container";
import { publicationRouter } from "./modules/publication/container";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/follow", followRouter);
router.use("/publication", publicationRouter);

export { router };
