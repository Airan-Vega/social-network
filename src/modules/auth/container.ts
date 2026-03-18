import { LoginUserUseCase } from "./application/useCases/loginUser.useCase";
import { RegisterUserUseCase } from "./application/useCases/registerUser.useCase";
import { RenewTokenUseCase } from "./application/useCases/renewToken.useCase";
import { TokenMongoRepository } from "./infrastructure/repositories/mongo/tokenMongo.repository";
import { UserMongoRepository } from "./infrastructure/repositories/mongo/userMongo.repository";
import { BcryptPasswordServiceSecurity } from "./infrastructure/security/bcryptPasswordService.security";
import { JwtTokenServiceSecurity } from "./infrastructure/security/jwtTokenService.security";
import { AuthController } from "./interfaces/controllers/auth.controller";
import { createAuthRouter } from "./interfaces/routes/auth.route";

// 1. Infrastructure
const userRepository = new UserMongoRepository();
const tokenRepository = new TokenMongoRepository();
const passwordService = new BcryptPasswordServiceSecurity();
const tokenService = new JwtTokenServiceSecurity();

// 2. Use-cases
const registerUser = new RegisterUserUseCase(
  userRepository,
  tokenRepository,
  passwordService,
  tokenService,
);
const loginUser = new LoginUserUseCase(
  userRepository,
  tokenRepository,
  passwordService,
  tokenService,
);
const renewToken = new RenewTokenUseCase(tokenRepository, tokenService);

// 3. Controller
const authController = new AuthController(registerUser, loginUser, renewToken);

// 4. Router — lo que exportas para app.ts
export const authRouter = createAuthRouter(authController);
