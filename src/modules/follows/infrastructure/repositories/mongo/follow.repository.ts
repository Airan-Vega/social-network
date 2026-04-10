import mongoose from "mongoose";
import { Follow } from "@src/modules/follows/domain/entities/follow";
import { User } from "@src/modules/follows/domain/entities/user";
import { FollowRepository } from "@src/modules/follows/domain/repositories/follow.repository";
import { FollowModel } from "../../models/follow.model";
import { IUserDocument } from "@src/shared/models/user.model";

export class FollowMongoRepository implements FollowRepository {
  async addFollowed(userId: string, followedId: string): Promise<void> {
    await FollowModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      followedId: new mongoose.Types.ObjectId(followedId),
    });
  }

  async removeFollowed(userId: string, followedId: string): Promise<void> {
    await FollowModel.deleteOne({
      userId,
      followedId,
    });
  }

  // Lista de personas que me siguen
  async getFollower(
    userId: string,
    page = 1,
    pageSize = 10,
  ): Promise<User[] | []> {
    const skip = (page - 1) * pageSize;
    const docs = await FollowModel.find({ followedId: userId })
      .populate<{ userId: IUserDocument }>({
        path: "userId",
        select: "_id email isActive nick image",
      })
      .skip(skip)
      .limit(pageSize)
      .lean();

    if (!docs) {
      return [];
    }

    const followedUsers = docs.map((doc) => doc.userId);

    return followedUsers.map(
      (followedUser) =>
        new User(
          followedUser._id.toString(),
          followedUser.email,
          followedUser.isActive,
          followedUser.nick,
          followedUser.image,
        ),
    );
  }

  // Lista de personas a las que sigo
  async getFollowed(
    userId: string,
    page = 1,
    pageSize = 10,
  ): Promise<User[] | []> {
    const skip = (page - 1) * pageSize;
    const docs = await FollowModel.find({ userId })
      .populate<{ followedId: IUserDocument }>({
        path: "followedId",
        select: "_id email isActive nick image",
      })
      .skip(skip)
      .limit(pageSize)
      .lean();

    if (!docs) {
      return [];
    }

    const followedUsers = docs.map((doc) => doc.followedId);

    return followedUsers.map(
      (followedUser) =>
        new User(
          followedUser._id.toString(),
          followedUser.email,
          followedUser.isActive,
          followedUser.nick,
          followedUser.image,
        ),
    );
  }

  async findFollowed(
    userId: string,
    followedId: string,
  ): Promise<Follow | null> {
    const doc = await FollowModel.findOne({ userId, followedId }).lean<{
      userId: string;
      followedId: string;
    }>();

    if (!doc) {
      return null;
    }

    return new Follow(doc.userId, doc.followedId);
  }
}
