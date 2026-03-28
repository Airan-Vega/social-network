import { Request, Response, NextFunction } from "express";
import { DeleteFollowedUseCase } from "../../application/useCases/deleteFollowed.useCase";
import { GetFollowedUseCase } from "../../application/useCases/getFollowed.useCase";
import { GetFollowerUseCase } from "../../application/useCases/getFollower.useCase";
import { RegisterFollowedUseCase } from "../../application/useCases/registerFollowed.useCase";

export class FollowController {
  constructor(
    private deleteFollowed: DeleteFollowedUseCase,
    private getFollowed: GetFollowedUseCase,
    private getFollower: GetFollowerUseCase,
    private registerFollowed: RegisterFollowedUseCase,
  ) {}

  async registerOneFollowed(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.user!.id; // Viene del auth middleware
      const followedId: string = req.body.followedId;
      await this.registerFollowed.execute({ userId, followedId });
      return res
        .status(200)
        .json({ message: "You are now following this user" });
    } catch (error) {
      next(error);
    }
  }

  async listFollowed(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.user!.id; // Viene del auth middleware
      const page = Number(req.query.page);
      const result = await this.getFollowed.execute(userId, page);
      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async listFollower(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.user!.id; // Viene del auth middleware
      const page = Number(req.query.page);
      const result = await this.getFollower.execute(userId, page);
      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async unfollow(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.user!.id; // Viene del auth middleware
      const followedId = req.params.followedId.toString();
      await this.deleteFollowed.execute({ userId, followedId });
      return res
        .status(200)
        .json({ message: "You are no longer following this user" });
    } catch (error) {
      next(error);
    }
  }
}
