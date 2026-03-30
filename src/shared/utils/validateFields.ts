import { ERROR_MESSAGES, HTTP_CODES } from "../constants";
import { AppError } from "./appError";

export const checkIfFieldExist = <T>(fieldName: string, value: T): boolean => {
  if (!value) {
    throw new AppError(
      `The field ${fieldName} is required`,
      HTTP_CODES.BAD_REQUEST,
    );
  }
  return true;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError(
      ERROR_MESSAGES.INVALID_EMAIL_FORMAT,
      HTTP_CODES.BAD_REQUEST,
    );
  }

  return true;
};
