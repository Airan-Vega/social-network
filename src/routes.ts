import { Router } from "express";
import { authRouter } from "./modules/auth/container";
import { userRouter } from "./modules/user/container";
import { followRouter } from "./modules/follows/container";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/follow", followRouter);

export { router };
