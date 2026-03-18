import { Router } from "express";
import { authRouter } from "./modules/auth/container";

const router = Router();

router.use("/auth", authRouter);

export { router };
