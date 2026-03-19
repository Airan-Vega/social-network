import jwt from "jsonwebtoken";
import {
  TokenPayload,
  TokenService,
} from "../../application/services/token.service";
import { AppError } from "../../../../shared/utils/appError";
import defaultConfig from "../../../../shared/config/default";

export class JwtTokenServiceSecurity implements TokenService {
  private readonly accessSecret = defaultConfig.jwtAccessSecret;
  private readonly refreshSecret = defaultConfig.jwtRefreshSecret;
  private readonly accessExpiry = defaultConfig.accessExpiry;
  private readonly refreshExpiry = defaultConfig.refreshExpiry;

  signAccessToken(payload: TokenPayload): string {
    if (!this.accessSecret) {
      throw new Error("JWT_ACCESS_SECRET is required");
    }

    return jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpiry,
    });
  }

  signRefreshToken(payload: TokenPayload): string {
    if (!this.refreshSecret) {
      throw new Error("JWT_REFRESH_SECRET is required");
    }
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiry,
    });
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      if (!this.accessSecret) {
        throw new Error("JWT_ACCESS_SECRET is required");
      }
      const decoded = jwt.verify(token, this.accessSecret) as TokenPayload & {
        exp: number;
        iat: number;
      };
      return {
        id: decoded.id,
        email: decoded.email,
      };
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }
  }

  verifyRefreshToken(token: string): TokenPayload {
    try {
      if (!this.refreshSecret) {
        throw new Error("JWT_REFRESH_SECRET is required");
      }
      const decoded = jwt.verify(token, this.refreshSecret) as TokenPayload & {
        exp: number;
        iat: number;
      };

      return {
        id: decoded.id,
        email: decoded.email,
      };
    } catch (error) {
      console.error(error);

      throw new AppError("Invalid or expired token", 401);
    }
  }
}
