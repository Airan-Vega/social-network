import { Follow } from "../entities/follow";
import { User } from "../entities/user";

export interface FollowRepository {
  addFollowed(userId: string, followedId: string): Promise<void>;
  removeFollowed(userId: string, followedId: string): Promise<void>;
  getFollower(
    userId: string,
    page?: number,
    pageSize?: number,
  ): Promise<User[] | []>; // Lista de personas que me siguen
  getFollowed(
    userId: string,
    page?: number,
    pageSize?: number,
  ): Promise<User[] | []>; // Lista de personas a las que sigo
  findFollowed(userId: string, followedId: string): Promise<Follow | null>;
}
