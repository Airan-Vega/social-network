import {
  mockPasswordService,
  mockTokenRepository,
  mockTokenService,
  mockUserRepository,
} from "./helpers/mocks";
import { RegisterUserUseCase } from "../registerUser.useCase";
// import { hashedPassword, tokenDto, userDto } from "./dtos";
import { AppError } from "../../../../../shared/utils/appError";
import { ERROR_MESSAGES, HTTP_CODES } from "../../../../../shared/constants";
import {
  existingUserMock,
  savedUserMock,
  setupSuccessfullRegister,
  tokenDto,
  userDto,
} from "./helpers";

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
      const savedUser = savedUserMock;

      setupSuccessfullRegister();

      // Act
      const result = await registerUser.execute(userDto);

      // Assert
      expect(result).toEqual({
        accessToken: tokenDto.accessToken,
        refreshToken: tokenDto.refreshToken,
        userId: savedUser.getId(),
      });
    });

    it("You must hash the password before saving the username", async () => {
      // Arrange
      setupSuccessfullRegister();

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
      const savedUser = savedUserMock;
      setupSuccessfullRegister();

      // Act
      await registerUser.execute(userDto);

      // Assert — verifica que el refresh token se guardó en DB
      expect(mockTokenRepository.save).toHaveBeenCalledTimes(1);
      expect(mockTokenRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: savedUser.getId(),
        }),
      );
    });
  });

  describe("when the registration fails", () => {
    it("It should throw an AppError with status code 409 if the email address already exists", async () => {
      // Arrange
      const existingUser = existingUserMock;
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(registerUser.execute(userDto)).rejects.toThrow(AppError);
      await expect(registerUser.execute(userDto)).rejects.toThrow(
        ERROR_MESSAGES.EMAIL_ALREADY_IN_USE,
      );
      await expect(registerUser.execute(userDto)).rejects.toMatchObject({
        statusCode: HTTP_CODES.CONFLICT,
      });
    });

    it("The system should not save the user if the email address already exists", async () => {
      // Arrange
      const existingUser = existingUserMock;
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      //Act & Assert — save nunca fue llamado
      await expect(registerUser.execute(userDto)).rejects.toThrow(AppError); // Se pone para que el error no pare el test
      expect(mockUserRepository.save).not.toHaveBeenCalled();
      expect(mockTokenRepository.save).not.toHaveBeenCalled();
    });
  });
});
