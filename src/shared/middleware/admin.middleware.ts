import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { ERROR_MESSAGES, HTTP_CODES } from "../constants";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const role = req.user?.role;

  if (!role || role !== "admin") {
    return next(
      new AppError(ERROR_MESSAGES.ROLE_NOT_ALLOWED, HTTP_CODES.FORBIDDEN),
    );
  }

  next();
};
