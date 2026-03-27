import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const errorHandlerMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  console.error(error);
  return res.status(500).json({
    error: "Internal server error",
  });
};
