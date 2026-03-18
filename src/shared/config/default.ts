import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";
dotenv.config();

const defaultConfig = {
  port: process.env.PORT || 3000,
  database: process.env.DB_CNN,
  saltRounds: process.env.SALT_ROUNDS || 10,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessExpiry: process.env.ACCESS_EXPIRY as SignOptions["expiresIn"],
  refreshExpiry: process.env.REFRESH_EXPIRY as SignOptions["expiresIn"],
};

export default defaultConfig;
