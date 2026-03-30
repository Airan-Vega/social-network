import { Token } from "../token";
import { spyCheckIfFieldExist, tokenData } from "./helpers/mocks";

import * as utils from "@src/shared/utils/validateFields";

// 👇 mock del módulo REAL que usa la clase
jest.mock("@src/shared/utils/validateFields", () => ({
  checkIfFieldExist: jest.fn(),
  validateEmail: jest.fn(),
}));

describe("Token", () => {
  let token: Token;
  const { userId, token: tokenKey, expiresAt, id } = tokenData;

  beforeEach(() => {
    jest.clearAllMocks();

    (utils.checkIfFieldExist as jest.Mock).mockReturnValue(true);
    (utils.validateEmail as jest.Mock).mockReturnValue(true);
  });

  describe("when the token is created successfully", () => {
    beforeEach(() => {
      token = new Token(userId, tokenKey, expiresAt, id);
    });

    it("should assign all properties correctly", () => {
      expect(token.getExpiresAt()).toBe(expiresAt);
      expect(token.getId()).toBe(id);
      expect(token.getToken()).toBe(tokenKey);
      expect(token.getUserId()).toBe(userId);
    });

    it("the token should not have expired", () => {
      expect(token.isExpired()).not.toBeTruthy();
    });

    it("should call validation functions with correct arguments", () => {
      expect(utils.checkIfFieldExist).toHaveBeenCalledWith("userId", userId);
      expect(utils.checkIfFieldExist).toHaveBeenCalledWith("token", tokenKey);
      expect(utils.checkIfFieldExist).toHaveBeenCalledWith(
        "expiresAt",
        expiresAt,
      );
    });

    it("should assign default values when optional params are not provided", () => {
      const token = new Token(userId, tokenKey, expiresAt);
      expect(token.getId()).toBeUndefined();
    });
  });

  describe("when validation fails", () => {
    it("should throw if userId is empty", () => {
      const errorMessage = "userId is required";

      spyCheckIfFieldExist(errorMessage);

      expect(() => new Token("", tokenKey, expiresAt)).toThrow(errorMessage);
    });

    it("should throw if token is empty", () => {
      const errorMessage = "token is required";

      spyCheckIfFieldExist(errorMessage);

      expect(() => new Token(userId, "", expiresAt)).toThrow(errorMessage);
    });

    it("should throw if expiresAt is empty", () => {
      const errorMessage = "expiresAt is required";

      spyCheckIfFieldExist(errorMessage);

      expect(() => new Token(userId, tokenKey, null as any)).toThrow(
        errorMessage,
      );
    });
  });
});
