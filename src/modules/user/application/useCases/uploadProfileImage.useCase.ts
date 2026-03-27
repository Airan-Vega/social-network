import { ERROR_MESSAGES, HTTP_CODES } from "../../../../shared/constants";
import { AppError } from "../../../../shared/utils/appError";
import { UserRepository } from "../../domain/repositories/user";
import { UploadProfileImageDto } from "../dtos/uploadProfileImage.dto";
import { ImageService } from "../services/image.service";

export class UploadProfileImageUseCase {
  constructor(
    private userRepository: UserRepository,
    private imageService: ImageService,
  ) {}

  async execute(dto: UploadProfileImageDto): Promise<void> {
    // 1. Verify if exist user
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_CODES.NOT_FOUND);
    }

    // 2. Save the new image in local
    const pathImage = this.imageService.save(dto.file);

    // 3. Save image path in DB
    await this.userRepository.uploadImage(dto.userId, pathImage);
  }
}
