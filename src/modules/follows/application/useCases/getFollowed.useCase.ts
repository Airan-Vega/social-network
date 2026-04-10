import { FollowRepository } from "../../domain/repositories/follow.repository";

export class GetFollowedUseCase {
  constructor(private followRepository: FollowRepository) {}
  public async execute(userId: string, page = 1, pageSize = 10) {
    return await this.followRepository.getFollowed(userId, page, pageSize);
  }
}
