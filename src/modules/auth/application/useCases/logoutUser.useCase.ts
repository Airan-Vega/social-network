import { TokenRepository } from "../../domain/repositories/token.repository";

export class LogoutUserUseCase {
  constructor(private tokenRepository: TokenRepository) {}

  async execute(userId: string): Promise<void> {
    await this.tokenRepository.deleteByUserId(userId);
  }
}
