import {
  mockUserRepository,
  mockTokenRepository,
  mockPasswordService,
  mockTokenService,
} from "./mocks";
import {
  hashedPassword,
  savedUserMock,
  savedTokenMock,
  tokenDto,
  existingUserMock,
} from "./fixtures";

export const setupSuccessfullRegister = () => {
  mockUserRepository.findByEmail.mockResolvedValue(null);
  mockPasswordService.hash.mockResolvedValue(hashedPassword);
  mockUserRepository.save.mockResolvedValue(savedUserMock);
  mockTokenService.signAccessToken.mockReturnValue(tokenDto.accessToken);
  mockTokenService.signRefreshToken.mockReturnValue(tokenDto.refreshToken);
  mockTokenRepository.save.mockResolvedValue(savedTokenMock);
};

export const setupSuccessfulLogin = () => {
  mockUserRepository.findByEmail.mockResolvedValue(existingUserMock);
  mockPasswordService.compare.mockResolvedValue(true);
  mockTokenRepository.deleteByUserId.mockResolvedValue();
  mockTokenService.signAccessToken.mockReturnValue(tokenDto.accessToken);
  mockTokenService.signRefreshToken.mockReturnValue(tokenDto.refreshToken);
  mockTokenRepository.save.mockResolvedValue(savedTokenMock);
};

export const setupSuccessfullRenewToken = () => {
  mockTokenRepository.findByToken.mockResolvedValue(savedTokenMock);
  mockTokenService.verifyRefreshToken.mockReturnValue({
    id: "user-id-123",
    email: "test@test.com",
    role: "user",
  });
  mockTokenService.signAccessToken.mockReturnValue(tokenDto.accessToken);
  mockTokenService.signRefreshToken.mockReturnValue(tokenDto.refreshToken);
  mockTokenRepository.deleteByUserId.mockResolvedValue();
  mockTokenRepository.save.mockResolvedValue(savedTokenMock);
};
