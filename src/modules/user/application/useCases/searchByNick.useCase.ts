import { UserRepository } from "../../domain/repositories/user";
import { UserResponseDto } from "../dtos/userResponse.dto";

export class SearchByNickUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(nick: string): Promise<UserResponseDto[]> {
    const users = await this.userRepository.searchByNick(nick);

    return users.map((user) => ({
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      surname: user.getSurname(),
      nick: user.getNick(),
      image: user.getImage(),
    }));
  }
}
