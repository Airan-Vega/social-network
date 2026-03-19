import { ERROR_MESSAGES, HTTP_CODES } from "../../../../shared/constants";
import { AppError } from "../../../../shared/utils/appError";
import { TokenRepository } from "../../domain/repositories/token.repository";
import { UserRepository } from "../../domain/repositories/user.repository";
import { TokenService } from "../services/token.service";

export class LogoutUserUseCase {
  constructor(
    private tokenRepository: TokenRepository,
    private userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  async execute(refreshToken?: string): Promise<void> {
    if (!refreshToken)
      throw new AppError(ERROR_MESSAGES.TOKEN_NOT_FOUND, HTTP_CODES.NOT_FOUND);
    const decode = this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.userRepository.findByEmail(decode.email);
    if (!user)
      throw new AppError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_CODES.UNAUTHORIZED,
      );

    await this.tokenRepository.deleteByUserId(user.getId()!);
  }
}
