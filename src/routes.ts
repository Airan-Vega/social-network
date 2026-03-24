import { Router } from "express";
import { authRouter } from "./modules/auth/container";
import { userRouter } from "./modules/user/container";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export { router };
