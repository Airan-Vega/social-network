import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../application/useCases/registerUser.useCase";
import { LoginUserUseCase } from "../../application/useCases/loginUser.useCase";
import { RenewTokenUseCase } from "../../application/useCases/renewToken.useCase";

export class AuthController {
  constructor(
    private registerUser: RegisterUserUseCase,
    private loginUser: LoginUserUseCase,
    private renewToken: RenewTokenUseCase,
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.registerUser.execute(req.body);
      return res.status(201).json(result);
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.loginUser.execute(req.body);
      return res.status(200).json(result);
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  async renew(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.renewToken.execute(req.body);
      return res.status(200).json(result);
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }
}
