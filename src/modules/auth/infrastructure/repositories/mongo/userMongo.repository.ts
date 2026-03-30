import { UserModel } from "../../../../../shared/models/user.model";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user.repository";

export class UserMongoRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email }).lean();
    if (!doc) return null;
    return new User(
      doc.email,
      doc.password,
      doc.role,
      doc.isActive,
      doc._id.toString(),
    );
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id).lean();
    if (!doc) return null;
    return new User(
      doc.email,
      doc.password,
      doc.role,
      doc.isActive,
      doc._id.toString(),
    );
  }

  async save(user: User): Promise<User> {
    const doc = await UserModel.create({
      email: user.getEmail(),
      password: user.getPassword(),
      isActive: user.getIsActive(),
    });
    return new User(
      doc.email,
      doc.password,
      doc.role,
      doc.isActive,
      doc._id.toString(),
    );
  }

  async updateIsActive(userId: string, isActive: boolean): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { isActive });
  }
}
