import { TokenRepository } from "../../../../domain/repositories/token.repository";
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { PasswordService } from "../../../services/password.service";
import { TokenService } from "../../../services/token.service";

export const mockUserRepository: jest.Mocked<UserRepository> = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  updateIsActive: jest.fn(),
};

export const mockTokenRepository: jest.Mocked<TokenRepository> = {
  save: jest.fn(),
  findByToken: jest.fn(),
  deleteByUserId: jest.fn(),
};

export const mockPasswordService: jest.Mocked<PasswordService> = {
  hash: jest.fn(),
  compare: jest.fn(),
};

export const mockTokenService: jest.Mocked<TokenService> = {
  signAccessToken: jest.fn(),
  signRefreshToken: jest.fn(),
  verifyAccessToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
};
