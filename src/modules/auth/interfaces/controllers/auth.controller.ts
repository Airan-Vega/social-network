import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../application/useCases/registerUser.useCase";
import { LoginUserUseCase } from "../../application/useCases/loginUser.useCase";
import { RenewTokenUseCase } from "../../application/useCases/renewToken.useCase";
import { clearCookie, setCookie } from "../../../../shared/utils";
import { AuthResponseDto } from "../../application/dtos/authResponse.dto";
import { LogoutUserUseCase } from "../../application/useCases/logoutUser.useCase";
import { UpdateIsActiveUserUseCase } from "../../application/useCases/updateIsActiveUser.useCase";

export class AuthController {
  private ACCESS_TOKEN = "access_token";
  private REFRESH_TOKEN = "refresh_token";

  constructor(
    private registerUser: RegisterUserUseCase,
    private loginUser: LoginUserUseCase,
    private renewToken: RenewTokenUseCase,
    private logoutUser: LogoutUserUseCase,
    private updateIsActiveUser: UpdateIsActiveUserUseCase,
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.registerUser.execute(req.body);
      // Si guardamos los tokens en la cookie no lo enviamos en la response
      this.setCookiesToken(res, result);
      return res.status(201).json({ userId: result.userId });
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.loginUser.execute(req.body);
      // Si guardamos los tokens en la cookie no lo enviamos en la response
      this.setCookiesToken(res, result);
      return res.status(200).json({ userId: result.userId });
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  async renew(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.renewToken.execute(req.body);
      // Si guardamos los tokens en la cookie no lo enviamos en la response
      this.setCookiesToken(res, result);
      return res.status(200).json({ userId: result.userId });
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // Viene del authMiddleware
      await this.logoutUser.execute(req.user!.id);
      // Limpiamos las cookies del front end
      this.clearCookiesToken(res);
      return res.status(200).json({ message: "Logout successfull" });
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  async updateIsActive(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id.toString();
      await this.updateIsActiveUser.execute(userId);
      return res
        .status(200)
        .json({ message: "The field 'is active' was updated successfull" });
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  private setCookiesToken(res: Response, result: AuthResponseDto) {
    // Estas cookies apareceran en el navegador del front end
    setCookie({ res, name: this.ACCESS_TOKEN, value: result.accessToken });
    setCookie({ res, name: this.REFRESH_TOKEN, value: result.refreshToken });
  }

  private clearCookiesToken(res: Response) {
    clearCookie(res, this.ACCESS_TOKEN);
    clearCookie(res, this.REFRESH_TOKEN);
  }
}
