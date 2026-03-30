import { User } from "../user";
import {
  spyCheckIfFieldExist,
  spyValidateEmail,
  userData,
} from "./helpers/mocks";
import { Role } from "@src/shared/enums";
import * as utils from "@src/shared/utils/validateFields";

// 👇 mock del módulo REAL que usa la clase
jest.mock("@src/shared/utils/validateFields", () => ({
  checkIfFieldExist: jest.fn(),
  validateEmail: jest.fn(),
}));

describe("Auth -> Domain -> Entities -> User", () => {
  let user: User;
  const { email, id, isActive, password, role } = userData;

  // Mock de dependencias externas

  beforeEach(() => {
    jest.clearAllMocks();

    (utils.checkIfFieldExist as jest.Mock).mockReturnValue(true);
    (utils.validateEmail as jest.Mock).mockReturnValue(true);
  });

  describe("when the user is created successfully", () => {
    beforeEach(() => {
      user = new User(email, password, role, isActive, id);
    });

    it("should assign all properties correctly", () => {
      expect(user.getId()).toBe(id);
      expect(user.getEmail()).toBe(email);
      expect(user.getIsActive()).toBe(isActive);
      expect(user.getPassword()).toBe(password);
      expect(user.getRole()).toBe(role);
    });

    it("should call validation functions with correct arguments", () => {
      new User(email, password);

      expect(utils.checkIfFieldExist).toHaveBeenCalledWith("email", email);
      expect(utils.validateEmail).toHaveBeenCalledWith(email);
      expect(utils.checkIfFieldExist).toHaveBeenCalledWith(
        "password",
        password,
      );
    });

    it("should assign default values when optional params are not provided", () => {
      const user = new User(email, password);

      expect(user.getIsActive()).toBe(true);
      expect(user.getRole()).toBe(Role.USER);
      expect(user.getId()).toBeUndefined();
    });

    it("should allow creating user with different role", () => {
      const user = new User(email, password, Role.ADMIN);

      expect(user.getRole()).toBe(Role.ADMIN);
    });

    it("should allow inactive users", () => {
      const user = new User(email, password, role, false);

      expect(user.getIsActive()).not.toBeTruthy();
    });
  });

  describe("when validation fails", () => {
    it("should throw if email is empty", () => {
      const errorMessage = "Email is required";

      spyCheckIfFieldExist(errorMessage);

      expect(() => new User("", password)).toThrow(errorMessage);
    });

    it("should throw if email is invalid", () => {
      const errorMessage = "Invalid email";

      spyValidateEmail(errorMessage);

      expect(() => new User("invalid-email", password)).toThrow(errorMessage);
    });

    it("should throw if password is empty", () => {
      const errorMessage = "Password is required";

      spyCheckIfFieldExist(errorMessage);

      expect(() => new User(email, "")).toThrow(errorMessage);
    });
  });
});
