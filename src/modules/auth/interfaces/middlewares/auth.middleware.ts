// interfaces/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { JwtTokenServiceSecurity } from "../../infrastructure/security/jwtTokenService.security";
import { AppError } from "../../../../shared/utils/appError";

const tokenService = new JwtTokenServiceSecurity();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("No token provided", 401);
    }

    const token = authHeader.split(" ")[1];
    const payload = tokenService.verifyRefreshToken(token);

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
