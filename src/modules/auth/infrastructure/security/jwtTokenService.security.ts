import jwt from "jsonwebtoken";
import {
  TokenPayload,
  TokenService,
} from "../../application/services/token.service";
import { AppError } from "../../../../shared/utils/appError";
import defaultConfig from "../../../../shared/config/default";
import { HTTP_CODES } from "../../../../shared/constants";
import { ERROR_MESSAGES } from "../../../../shared/constants/errorMessages";

export class JwtTokenServiceSecurity implements TokenService {
  private readonly accessSecret = defaultConfig.jwtAccessSecret;
  private readonly refreshSecret = defaultConfig.jwtRefreshSecret;
  private readonly accessExpiry = defaultConfig.accessExpiry;
  private readonly refreshExpiry = defaultConfig.refreshExpiry;

  signAccessToken(payload: TokenPayload): string {
    if (!this.accessSecret) {
      throw new AppError(
        ERROR_MESSAGES.JWT_ACCESS_SECRET_IS_REQUIRED,
        HTTP_CODES.BAD_REQUEST,
      );
    }

    return jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpiry,
    });
  }

  signRefreshToken(payload: TokenPayload): string {
    if (!this.refreshSecret) {
      throw new AppError(
        ERROR_MESSAGES.JWT_REFRESH_SECRET_IS_REQUIRED,
        HTTP_CODES.BAD_REQUEST,
      );
    }
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiry,
    });
  }

  verifyAccessToken(token: string): TokenPayload {
    if (!this.accessSecret) {
      throw new AppError(
        ERROR_MESSAGES.JWT_ACCESS_SECRET_IS_REQUIRED,
        HTTP_CODES.BAD_REQUEST,
      );
    }
    try {
      const decoded = jwt.verify(token, this.accessSecret) as TokenPayload & {
        exp: number;
        iat: number;
      };
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    } catch {
      throw new AppError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_CODES.UNAUTHORIZED);
    }
  }

  verifyRefreshToken(token: string): TokenPayload {
    if (!this.refreshSecret) {
      throw new AppError(
        ERROR_MESSAGES.JWT_REFRESH_SECRET_IS_REQUIRED,
        HTTP_CODES.BAD_REQUEST,
      );
    }
    try {
      const decoded = jwt.verify(token, this.refreshSecret) as TokenPayload & {
        exp: number;
        iat: number;
      };

      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    } catch (error) {
      console.error(error);

      throw new AppError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_CODES.UNAUTHORIZED);
    }
  }
}
