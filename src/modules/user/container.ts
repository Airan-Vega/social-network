import { GetOwnProfileUseCase } from "./application/useCases/getOwnProfile.useCase";
import { UpdateUserUseCase } from "./application/useCases/updateUser.useCase";
import { SearchByNickUseCase } from "./application/useCases/searchByNick.useCase";
import { UserMongoRepository } from "./infrastructure/repositories/mongo/userRepositoryMongo.repository";
import { UserController } from "./interfaces/controllers/user.controller";
import { createUserRouter } from "./interfaces/routes/user.route";
import { UploadProfileImageUseCase } from "./application/useCases/uploadProfileImage.useCase";
import { LocalImageService } from "./infrastructure/services/localImage.service";

// 1. Infrastructure
const userRepository = new UserMongoRepository();
const imageService = new LocalImageService();

// 2. Use-cases
const getOwnProfile = new GetOwnProfileUseCase(userRepository);
const searchByNick = new SearchByNickUseCase(userRepository);
const saveUser = new UpdateUserUseCase(userRepository);
const uploadProfileImage = new UploadProfileImageUseCase(
  userRepository,
  imageService,
);

// 3. Controller
const userController = new UserController(
  getOwnProfile,
  searchByNick,
  saveUser,
  uploadProfileImage,
);

// 4. Router — lo que exportas para app.ts
export const userRouter = createUserRouter(userController);
