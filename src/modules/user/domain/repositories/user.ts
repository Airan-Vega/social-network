import { UpdateProfileDto } from "../../application/dtos/updateProfile.dto";
import { User } from "../entities/user";

export interface UserRepository {
  findById(userId: string): Promise<User | null>;
  searchByNick(nick: string): Promise<User[] | []>;
  update(id: string, values: UpdateProfileDto): Promise<User | null>;
  uploadImage(userId: string, imageUrl: string): Promise<void>;
}
