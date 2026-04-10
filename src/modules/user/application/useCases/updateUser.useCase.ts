import { ERROR_MESSAGES, HTTP_CODES } from "../../../../shared/constants";
import { AppError } from "../../../../shared/utils/appError";
import { UserRepository } from "../../domain/repositories/user";
import { UpdateProfile } from "../../domain/types/ updateProfile";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, profileValues: UpdateProfile): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_CODES.NOT_FOUND);
    }

    await this.userRepository.update(userId, profileValues);
  }
}
