import { ERROR_MESSAGES, HTTP_CODES } from "../../../../shared/constants";
import { AppError } from "../../../../shared/utils/appError";
import { UserRepository } from "../../domain/repositories/user";
import { UserResponseDto } from "../dtos/userResponse.dto";

export class GetOwnProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);

    if (!user)
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_CODES.NOT_FOUND);

    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      surname: user.getSurname(),
      nick: user.getNick(),
      image: user.getImage(),
    };
  }
}
