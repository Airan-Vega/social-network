import { DeleteFollowedUseCase } from "./application/useCases/deleteFollowed.useCase";
import { GetFollowedUseCase } from "./application/useCases/getFollowed.useCase";
import { GetFollowerUseCase } from "./application/useCases/getFollower.useCase";
import { RegisterFollowedUseCase } from "./application/useCases/registerFollowed.useCase";
import { FollowMongoRepository } from "./infrastructure/repositories/mongo/follow.repository";
import { FollowController } from "./interfaces/controllers/follow.controller";
import { createFollowRouter } from "./interfaces/routes/follow.route";

// 1. Infrastructure
const followRepository = new FollowMongoRepository();

// 2. Use-cases
const deleteFollowed = new DeleteFollowedUseCase(followRepository);
const getFollowed = new GetFollowedUseCase(followRepository);
const getFollower = new GetFollowerUseCase(followRepository);
const registerFollowed = new RegisterFollowedUseCase(followRepository);

// 3. Controller
const followController = new FollowController(
  deleteFollowed,
  getFollowed,
  getFollower,
  registerFollowed,
);

// 4. Router — lo que exportas para app.ts
export const followRouter = createFollowRouter(followController);
