import { AppError } from "../../../../shared/utils/appError";
import { Token } from "../../domain/entities/token";
import { User } from "../../domain/entities/user";
import { TokenRepository } from "../../domain/repositories/token.repository";
import { UserRepository } from "../../domain/repositories/user.repository";
import { AuthCredentialsDto } from "../dtos/authCredentials.dto";
import { AuthResponseDto } from "../dtos/authResponse.dto";
import { PasswordService } from "../services/password.service";
import { TokenService } from "../services/token.service";

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  async execute(dto: AuthCredentialsDto): Promise<AuthResponseDto> {
    // 1. Verificar que el email no esté en uso
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) throw new AppError("Email already in use", 409);

    // 2. Hashear el password
    const hashedPassword = await this.passwordService.hash(dto.password);

    // 3. Crear y guardar el usuario
    const user = new User(dto.email, hashedPassword);
    const savedUser = await this.userRepository.save(user);

    // 4. Generar tokens
    const payload = { id: savedUser.getId()!, email: savedUser.getEmail() };
    const accessToken = this.tokenService.signAccessToken(payload);
    const refreshToken = this.tokenService.signRefreshToken(payload);

    // 5. Persistir el refresh token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
    const tokenEntity = new Token(savedUser.getId()!, refreshToken, expiresAt);
    await this.tokenRepository.save(tokenEntity);

    return { accessToken, refreshToken, userId: savedUser.getId()! };
  }
}
