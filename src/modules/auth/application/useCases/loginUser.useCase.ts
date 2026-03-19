import { AppError } from "../../../../shared/utils/appError";
import { Token } from "../../domain/entities/token";
import { TokenRepository } from "../../domain/repositories/token.repository";
import { UserRepository } from "../../domain/repositories/user.repository";
import { AuthCredentialsDto } from "../dtos/authCredentials.dto";
import { AuthResponseDto } from "../dtos/authResponse.dto";
import { PasswordService } from "../services/password.service";
import { TokenService } from "../services/token.service";

export class LoginUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  async execute(dto: AuthCredentialsDto): Promise<AuthResponseDto> {
    // 1. Verificar que el usuario existe
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new AppError("Invalid credentials", 401);

    // 2. Verificar que está activo
    if (!user.getIsActive()) throw new AppError("Account is disabled", 403);

    // 3. Verificar el password
    const isValid = await this.passwordService.compare(
      dto.password,
      user.getPassword(),
    );
    if (!isValid) throw new AppError("Invalid credentials", 401);

    // 4. Invalidar refresh tokens anteriores del usuario
    await this.tokenRepository.deleteByUserId(user.getId()!);

    // 5. Generar tokens nuevos
    const payload = { id: user.getId()!, email: user.getEmail() };
    const accessToken = this.tokenService.signAccessToken(payload);
    const refreshToken = this.tokenService.signRefreshToken(payload);

    // 6. Persistir el nuevo refresh token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
    const tokenEntity = new Token(user.getId()!, refreshToken, expiresAt);
    await this.tokenRepository.save(tokenEntity);

    return { accessToken, refreshToken, userId: user.getId()! };
  }
}
