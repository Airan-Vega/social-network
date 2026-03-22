import { AppError } from "../../../../shared/utils/appError";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UpdateIsActiveUser {
  constructor(private userRepository: UserRepository) {}

  async execute(targetUserId: string): Promise<void> {
    // 1. Buscar el usuario objetivo
    const user = await this.userRepository.findById(targetUserId);
    if (!user) throw new AppError("User not found", 404);

    // 2. Invertir el estado
    const newIsActive = !user.getIsActive();

    // 3. Actualizar
    await this.userRepository.updateIsActive(targetUserId, newIsActive);
  }
}
