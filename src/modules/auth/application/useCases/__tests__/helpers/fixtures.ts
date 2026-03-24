import { User } from "../../../../domain/entities/user";
import { Token } from "../../../../domain/entities/token";
import { Role } from "../../../../../../shared/enums";

export const password = "123456";
export const hashedPassword = "hashedPassword";

export const userDto = {
  email: "test@test.com",
  password: password,
};

export const tokenDto = {
  accessToken: "access-token-mock",
  refreshToken: "refresh-token-mock",
};

export const savedUserMock = new User(
  userDto.email,
  hashedPassword,
  Role.USER,
  true,
  "user-id-123",
);

export const existingUserMock = new User(
  userDto.email,
  hashedPassword,
  Role.USER,
  true,
  "existing-id-123",
);

export const existingUserInactiveMock = new User(
  userDto.email,
  hashedPassword,
  Role.USER,
  false,
  "existing-id-123",
);

export const savedTokenMock = new Token(
  "user-id-123",
  tokenDto.refreshToken,
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
);
