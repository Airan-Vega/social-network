import { Role } from "@src/shared/enums";
import refreshExpiry from "@src/shared/utils/refreshExpiry";
import * as utils from "@src/shared/utils/validateFields";

export const userData = {
  email: "test@test.com",
  password: "123456",
  role: Role.USER,
  isActive: true,
  id: "1",
};

export const tokenData = {
  userId: "2",
  token: "dhghghgh1111",
  expiresAt: refreshExpiry, // 7 días
  id: "1",
};

export const spyCheckIfFieldExist = (errorMessage: string) =>
  jest.spyOn(utils, "checkIfFieldExist").mockImplementation((field, value) => {
    if (!value) {
      throw new Error(errorMessage);
    }
    return true;
  });
export const spyValidateEmail = (errorMessage: string) =>
  jest.spyOn(utils, "validateEmail").mockImplementation((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error(errorMessage);
    }
    return true;
  });
