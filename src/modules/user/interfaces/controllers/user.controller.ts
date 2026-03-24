import { NextFunction, Request, Response } from "express";
import { GetOwnProfileUseCase } from "../../application/useCases/getOwnProfile.useCase";
import { SearchByNickUseCase } from "../../application/useCases/searchByNick.useCase";
import { AppError } from "../../../../shared/utils/appError";
import { ERROR_MESSAGES, HTTP_CODES } from "../../../../shared/constants";
import { UpdateUserUseCase } from "../../application/useCases/updateUser.useCase";
import { UploadProfileImageUseCase } from "../../application/useCases/uploadProfileImage.useCase";

export class UserController {
  constructor(
    private getOwnProfile: GetOwnProfileUseCase,
    private searchByNick: SearchByNickUseCase,
    private updateUser: UpdateUserUseCase,
    private uploadProfileImage: UploadProfileImageUseCase,
  ) {}

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id; // Viene del auth middleware
      const result = await this.getOwnProfile.execute(userId);

      return res.status(200).json({ data: result });
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  async searchUsersByNick(req: Request, res: Response, next: NextFunction) {
    try {
      const nick = req.query.nick?.toString();

      if (!nick)
        throw new AppError(
          ERROR_MESSAGES.NICK_IS_REQUIRED,
          HTTP_CODES.BAD_REQUEST,
        );
      const result = await this.searchByNick.execute(nick);
      return res.status(200).json({ data: result });
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id.toString();
      const user = req.body;
      this.updateUser.execute(userId, user);
      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }

  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id.toString();
      const file = req.file;

      if (!file) {
        throw new AppError(
          ERROR_MESSAGES.PROFILE_IMAGE_IS_REQUIRED,
          HTTP_CODES.BAD_REQUEST,
        );
      }
      await this.uploadProfileImage.execute({
        userId,
        file,
      });
      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      // Delego el error en el middleware errorHandlerMiddleware
      next(error);
    }
  }
}
