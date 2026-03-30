import jwt from "jsonwebtoken";
import { JwtTokenServiceSecurity } from "../jwtTokenService.security";
import { TokenPayload } from "@src/modules/auth/application/services/token.service";
import { ERROR_MESSAGES } from "@src/shared/constants";
import { AppError } from "@src/shared/utils";

jest.mock("jsonwebtoken"); // Mockeamos todo el módulo

describe("Auth -> Infrastructure -> Security -> JwtToken", () => {
  let service: JwtTokenServiceSecurity;
  const payload: TokenPayload = {
    id: "user123",
    email: "user@example.com",
    role: "user",
  };

  beforeEach(async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    service = new JwtTokenServiceSecurity();
    jest.clearAllMocks();
  });

  it("signAccessToken -> should return a signed JWT token string", async () => {
    const signValue = "mocked.jwt.token";

    (jwt.sign as jest.Mock).mockReturnValue(signValue);

    const token = service.signAccessToken(payload);

    expect(token).toBe(signValue);
    expect(jwt.sign).toHaveBeenCalledWith(payload, service["accessSecret"], {
      expiresIn: service["accessExpiry"],
    });
  });

  it("signAccessToken -> should throw AppError if accessSecret is missing", () => {
    // @ts-expect-error forzamos que sea undefined
    service["accessSecret"] = undefined;

    expect(() => service.signAccessToken(payload)).toThrow(AppError);
    expect(() => service.signAccessToken(payload)).toThrow(
      ERROR_MESSAGES.JWT_ACCESS_SECRET_IS_REQUIRED,
    );
  });

  it("signRefreshToken -> should return a signed JWT token string", async () => {
    const signValue = "mocked.jwt.token";

    (jwt.sign as jest.Mock).mockReturnValue(signValue);

    const token = service.signRefreshToken(payload);

    expect(token).toBe(signValue);
    expect(jwt.sign).toHaveBeenCalledWith(payload, service["refreshSecret"], {
      expiresIn: service["refreshExpiry"],
    });
  });

  it("signRefreshToken -> should throw AppError if refreshSecret is missing", () => {
    // @ts-expect-error forzamos que sea undefined
    service["refreshSecret"] = undefined;

    expect(() => service.signRefreshToken(payload)).toThrow(AppError);
    expect(() => service.signRefreshToken(payload)).toThrow(
      ERROR_MESSAGES.JWT_REFRESH_SECRET_IS_REQUIRED,
    );
  });

  it("verifyAccessToken -> should return a 'TokenPayload'", async () => {
    const verifyValue = { ...payload, exp: 123456, iat: 123456 };
    const token = "mocked.jwt.token";

    (jwt.verify as jest.Mock).mockReturnValue(verifyValue);

    const payloadAccessToken = service.verifyAccessToken(token);

    expect(payloadAccessToken).toEqual(payload);
    expect(jwt.verify).toHaveBeenCalledWith(token, service["accessSecret"]);
  });

  it("verifyAccessToken -> should throw AppError if accessSecret is missing", () => {
    // @ts-expect-error forzamos que sea undefined
    service["accessSecret"] = undefined;
    const token = "mocked.jwt.token";

    expect(() => service.verifyAccessToken(token)).toThrow(AppError);
    expect(() => service.verifyAccessToken(token)).toThrow(
      ERROR_MESSAGES.JWT_ACCESS_SECRET_IS_REQUIRED,
    );
  });

  it("verifyAccessToken -> should throw AppError if token is invalid", () => {
    const token = "invalid.token";

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("jwt error");
    });

    expect(() => service.verifyAccessToken(token)).toThrow(AppError);
    expect(() => service.verifyAccessToken(token)).toThrow(
      ERROR_MESSAGES.INVALID_TOKEN,
    );
  });

  it("verifyRefreshToken -> should return a 'TokenPayload'", async () => {
    const verifyValue = { ...payload, exp: 123456, iat: 123456 };
    const token = "mocked.jwt.token";

    (jwt.verify as jest.Mock).mockReturnValue(verifyValue);

    const payloadAccessToken = service.verifyRefreshToken(token);

    expect(payloadAccessToken).toEqual(payload);
    expect(jwt.verify).toHaveBeenCalledWith(token, service["refreshSecret"]);
  });

  it("verifyRefreshToken -> should throw AppError if accessSecret is missing", () => {
    // @ts-expect-error forzamos que sea undefined
    service["refreshSecret"] = undefined;
    const token = "mocked.jwt.token";

    expect(() => service.verifyRefreshToken(token)).toThrow(AppError);
    expect(() => service.verifyRefreshToken(token)).toThrow(
      ERROR_MESSAGES.JWT_REFRESH_SECRET_IS_REQUIRED,
    );
  });

  it("verifyRefreshToken -> should throw AppError if token is invalid", () => {
    const token = "invalid.token";

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("jwt error");
    });

    expect(() => service.verifyRefreshToken(token)).toThrow(AppError);
    expect(() => service.verifyRefreshToken(token)).toThrow(
      ERROR_MESSAGES.INVALID_TOKEN,
    );
  });
});
