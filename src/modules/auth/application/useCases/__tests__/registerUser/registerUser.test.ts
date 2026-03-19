import { User } from "../../../../domain/entities/user";

import {
  mockPasswordService,
  mockTokenRepository,
  mockTokenService,
  mockUserRepository,
} from "./mocks";
import { RegisterUserUseCase } from "../../registerUser.useCase";
import { hashedPassword, tokenDto, userDto } from "./dtos";
import { AppError } from "../../../../../../shared/utils/appError";

describe("RegisterUser", () => {
  let registerUser: RegisterUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    registerUser = new RegisterUserUseCase(
      mockUserRepository,
      mockTokenRepository,
      mockPasswordService,
      mockTokenService,
    );
  });
  describe("when the registration is successful", () => {
    it("You must register a user and receive an access token and a refresh token", async () => {
      // Arrange

      const savedUser = new User(
        userDto.email,
        hashedPassword,
        userDto.isActive,
        userDto.userId,
      );
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockPasswordService.hash.mockResolvedValue(hashedPassword);
      mockUserRepository.save.mockResolvedValue(savedUser);
      mockTokenService.signAccessToken.mockReturnValue(tokenDto.accessToken);
      mockTokenService.signRefreshToken.mockReturnValue(tokenDto.refreshToken);
      mockTokenRepository.save.mockResolvedValue({} as any);

      // Act
      const result = await registerUser.execute(userDto);

      // Assert
      expect(result).toEqual({
        accessToken: tokenDto.accessToken,
        refreshToken: tokenDto.refreshToken,
        userId: userDto.userId,
      });
    });

    it("You must hash the password before saving the username", async () => {
      // Arrange
      const savedUser = new User(
        userDto.email,
        hashedPassword,
        userDto.isActive,
        userDto.userId,
      );

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockPasswordService.hash.mockResolvedValue(hashedPassword);
      mockUserRepository.save.mockResolvedValue(savedUser);
      mockTokenService.signAccessToken.mockReturnValue(tokenDto.accessToken);
      mockTokenService.signRefreshToken.mockReturnValue(tokenDto.refreshToken);
      mockTokenRepository.save.mockResolvedValue({} as any);

      // Act
      await registerUser.execute(userDto);

      // Assert — verifica que hash fue llamado con el password original
      expect(mockPasswordService.hash).toHaveBeenCalledWith(userDto.password);
      expect(mockUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ email: userDto.email }),
      );
    });

    it("The refresh token must remain in the tokens collection", async () => {
      // Arrange

      const savedUser = new User(
        userDto.email,
        hashedPassword,
        userDto.isActive,
        userDto.userId,
      );

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockPasswordService.hash.mockResolvedValue(hashedPassword);
      mockUserRepository.save.mockResolvedValue(savedUser);
      mockTokenService.signAccessToken.mockReturnValue(tokenDto.accessToken);
      mockTokenService.signRefreshToken.mockReturnValue(tokenDto.refreshToken);
      mockTokenRepository.save.mockResolvedValue({} as any);

      // Act
      await registerUser.execute(userDto);

      // Assert — verifica que el refresh token se guardó en DB
      expect(mockTokenRepository.save).toHaveBeenCalledTimes(1);
      expect(mockTokenRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: userDto.userId,
        }),
      );
    });
  });

  describe("when the registration fails", () => {
    it("It should throw an AppError with status code 409 if the email address already exists", async () => {
      // Arrange
      const existingUser = new User(
        userDto.email,
        hashedPassword,
        userDto.isActive,
        userDto.userId,
      );

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(registerUser.execute(userDto)).rejects.toThrow(AppError);
      await expect(registerUser.execute(userDto)).rejects.toThrow(
        "Email already in use",
      );
      await expect(registerUser.execute(userDto)).rejects.toMatchObject({
        statusCode: 409,
      });
    });

    it("It should throw an AppError with status code 409 if the email address already exists", async () => {
      // Arrange

      const existingUser = new User(
        userDto.email,
        hashedPassword,
        userDto.isActive,
        userDto.userId,
      );

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act
      try {
        await registerUser.execute(userDto);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).statusCode).toBe(409);
      }
    });

    it("The system should not save the user if the email address already exists", async () => {
      // Arrange

      const existingUser = new User(
        userDto.email,
        hashedPassword,
        userDto.isActive,
        userDto.userId,
      );

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act
      try {
        await registerUser.execute(userDto);
      } catch {}

      // Assert — save nunca fue llamado
      expect(mockUserRepository.save).not.toHaveBeenCalled();
      expect(mockTokenRepository.save).not.toHaveBeenCalled();
    });
  });
});
