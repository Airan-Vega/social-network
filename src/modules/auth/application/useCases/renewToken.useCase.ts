import { AppError } from "../../../../shared/utils/appError";
import { Token } from "../../domain/entities/token";
import { TokenRepository } from "../../domain/repositories/token.repository";
import { AuthResponseDto } from "../dtos/authResponse.dto";
import { RenewTokenDto } from "../dtos/renewToken.dto";
import { TokenService } from "../services/token.service";

export class RenewTokenUseCase {
  constructor(
    private tokenRepository: TokenRepository,
    private tokenService: TokenService,
  ) {}

  async execute(dto: RenewTokenDto): Promise<AuthResponseDto> {
    // 1. Verificar que el refresh token es un JWT válido
    const payload = this.tokenService.verifyRefreshToken(dto.refreshToken);
    if (!payload) throw new AppError("Invalid token", 401);

    // 2. Verificar que el refresh token existe en base de datos
    const tokenEntity = await this.tokenRepository.findByToken(
      dto.refreshToken,
    );
    if (!tokenEntity) throw new AppError("Token not found", 401);

    // 3. Verificar que no ha expirado (lógica de la entidad)
    if (tokenEntity.isExpired()) throw new AppError("Token expired", 401);

    // 4. Rotar — eliminar el viejo y generar uno nuevo
    await this.tokenRepository.deleteByUserId(tokenEntity.getUserId());

    const accessToken = this.tokenService.signAccessToken(payload);
    const refreshToken = this.tokenService.signRefreshToken(payload);

    // 5. Persistir el nuevo refresh token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const newTokenEntity = new Token(
      tokenEntity.getUserId(),
      refreshToken,
      expiresAt,
    );
    await this.tokenRepository.save(newTokenEntity);

    return { accessToken, refreshToken, userId: tokenEntity.getUserId() };
  }
}
