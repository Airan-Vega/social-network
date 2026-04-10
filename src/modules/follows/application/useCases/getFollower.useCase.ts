import { FollowRepository } from "../../domain/repositories/follow.repository";

export class GetFollowerUseCase {
  constructor(private followRepository: FollowRepository) {}
  public async execute(userId: string, page = 1, pageSize = 10) {
    return await this.followRepository.getFollower(userId, page, pageSize);
  }
}
