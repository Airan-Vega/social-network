import { ERROR_MESSAGES, HTTP_CODES } from "../../../../../shared/constants";
import { AppError } from "../../../../../shared/utils/appError";
import { LoginUserUseCase } from "../loginUser.useCase";
import {
  existingUserInactiveMock,
  existingUserMock,
  hashedPassword,
  setupSuccessfulLogin,
  tokenDto,
  userDto,
} from "./helpers";
import {
  mockPasswordService,
  mockTokenRepository,
  mockTokenService,
  mockUserRepository,
} from "./helpers/mocks";

describe("Login user", () => {
  let loginUser: LoginUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    loginUser = new LoginUserUseCase(
      mockUserRepository,
      mockTokenRepository,
      mockPasswordService,
      mockTokenService,
    );
  });
  describe("when the login is successful", () => {
    it("When you log in, you receive an access token, a refresh token, and a user ID", async () => {
      // Arrange
      setupSuccessfulLogin();

      // Act
      const result = await loginUser.execute(userDto);

      // Assert
      expect(result).toEqual({
        accessToken: tokenDto.accessToken,
        refreshToken: tokenDto.refreshToken,
        userId: existingUserMock.getId(),
      });
    });

    it("should compare the password with the hashed password", async () => {
      // Arrange
      setupSuccessfulLogin();
      // Act
      await loginUser.execute(userDto);
      // Assert
      expect(mockPasswordService.compare).toHaveBeenCalledWith(
        userDto.password,
        hashedPassword,
      );
    });

    it("should delete old token before saving the new one", async () => {
      // Arrange
      setupSuccessfulLogin();
      // Act
      await loginUser.execute(userDto);

      // Assert
      // verifica que deleteByUserId se llamó ANTES que save

      // Los mocks de jest tiene un objeto ".mock" que guarda informnacion sobre todas las llamadas que se han hecho a una función.
      // ".invocationCallOrder" es un array que guarda el número de orden global en el que fue llamado la función durante el test. es decir,
      // si se llama primero deleteByUserId este tendra el valor de 1 y si despues se llama save.este tendra el valor de 2.
      const deleteOrder =
        mockTokenRepository.deleteByUserId.mock.invocationCallOrder[0];
      const saveOrder = mockTokenRepository.save.mock.invocationCallOrder[0];

      expect(deleteOrder).toBeLessThan(saveOrder);
    });

    it("should save the new refresh token in DB", async () => {
      // Arrange
      setupSuccessfulLogin();
      // Act
      await loginUser.execute(userDto);
      // Assert
      expect(mockTokenRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ token: tokenDto.refreshToken }),
      );
    });
  });

  describe("when the login fails", () => {
    it("Throw an error if the user cannot be found", async () => {
      // Arrange
      mockUserRepository.findByEmail.mockResolvedValue(null);
      // Act & Assert
      await expect(loginUser.execute(userDto)).rejects.toThrow(AppError);
      await expect(loginUser.execute(userDto)).rejects.toThrow(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
      );
      await expect(loginUser.execute(userDto)).rejects.toMatchObject({
        statusCode: HTTP_CODES.UNAUTHORIZED,
      });
    });
    it("Throw an error when the user is inactive", async () => {
      // Arrange
      mockUserRepository.findByEmail.mockResolvedValue(
        existingUserInactiveMock,
      );
      // Act & Assert
      await expect(loginUser.execute(userDto)).rejects.toThrow(AppError);
      await expect(loginUser.execute(userDto)).rejects.toThrow(
        ERROR_MESSAGES.ACCOUNT_DISABLED,
      );
      await expect(loginUser.execute(userDto)).rejects.toMatchObject({
        statusCode: HTTP_CODES.FORBIDDEN,
      });
    });

    it("Throw an error when the password is invalid", async () => {
      // Arrange
      mockUserRepository.findByEmail.mockResolvedValue(existingUserMock);
      mockPasswordService.compare.mockResolvedValue(false);

      // Act & Assert
      await expect(loginUser.execute(userDto)).rejects.toThrow(AppError);
      await expect(loginUser.execute(userDto)).rejects.toThrow(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
      );
      await expect(loginUser.execute(userDto)).rejects.toMatchObject({
        statusCode: HTTP_CODES.UNAUTHORIZED,
      });
    });

    it("should not delete or save tokens if user is not found", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      // Hace que el codigo continue ejecutandose despues de un error
      try {
        await loginUser.execute(userDto);
      } catch {}

      expect(mockTokenRepository.deleteByUserId).not.toHaveBeenCalled();
      expect(mockTokenRepository.save).not.toHaveBeenCalled();
    });

    it("should not delete or save tokens if password is invalid", async () => {
      mockUserRepository.findByEmail.mockResolvedValue(existingUserMock);
      mockPasswordService.compare.mockResolvedValue(false);

      // Hace que el codigo continue ejecutandose despues de un error
      try {
        await loginUser.execute(userDto);
      } catch {}
      expect(mockTokenRepository.deleteByUserId).not.toHaveBeenCalled();
      expect(mockTokenRepository.save).not.toHaveBeenCalled();
    });
  });
});
