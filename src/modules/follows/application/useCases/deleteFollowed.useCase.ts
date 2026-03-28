import { AppError } from "@src/shared/utils";
import { FollowRepository } from "../../domain/repositories/follow.repository";
import { FollowCredentialsDto } from "../dtos";
import { ERROR_MESSAGES, HTTP_CODES } from "@src/shared/constants";
export class DeleteFollowedUseCase {
  constructor(private followRepository: FollowRepository) {}
  public async execute(dto: FollowCredentialsDto) {
    const existFollowed = await this.followRepository.findFollowed(
      dto.userId,
      dto.followedId,
    );
    if (!existFollowed) {
      throw new AppError(
        ERROR_MESSAGES.FOLLOWED_NOT_EXIST,
        HTTP_CODES.CONFLICT,
      );
    }

    await this.followRepository.removeFollowed(dto.userId, dto.followedId);
  }
}
