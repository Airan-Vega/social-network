import { ERROR_MESSAGES, HTTP_CODES } from "../../../../shared/constants";
import { AppError } from "../../../../shared/utils/appError";
import { UserRepository } from "../../domain/repositories/user";
import { UpdateProfileDto } from "../dtos/updateProfile.dto";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, dto: UpdateProfileDto): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_CODES.NOT_FOUND);
    }

    await this.userRepository.update(userId, dto);
  }
}
