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
    if (!refreshToken) throw new AppError("Refresh token not found", 404);
    const decode = this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.userRepository.findByEmail(decode.email);
    if (!user) throw new AppError("Invalid credentials", 401);

    await this.tokenRepository.deleteByUserId(user.getId()!);
  }
}
