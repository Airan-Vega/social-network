import { Request, Response, NextFunction } from "express";
import { JwtTokenServiceSecurity } from "../../modules/auth/infrastructure/security/jwtTokenService.security";
import { AppError } from "../utils/appError";
import { ERROR_MESSAGES, HTTP_CODES } from "../constants";

const tokenService = new JwtTokenServiceSecurity();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        ERROR_MESSAGES.NO_TOKEN_PROVIDED,
        HTTP_CODES.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(" ")[1];
    const payload = tokenService.verifyAccessToken(token);

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
