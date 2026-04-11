import { User } from "../entities/user";
import { UpdateProfile } from "../types/updateProfile";

export interface UserRepository {
  findById(userId: string): Promise<User | null>;
  searchByNick(nick: string): Promise<User[] | []>;
  update(id: string, values: UpdateProfile): Promise<User | null>;
  uploadImage(userId: string, imageUrl: string): Promise<void>;
}
