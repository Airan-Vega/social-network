import { UpdateProfile } from "@src/modules/user/domain/types/ updateProfile";
import { UserModel } from "../../../../../shared/models/user.model";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user";

export class UserMongoRepository implements UserRepository {
  async findById(userId: string): Promise<User | null> {
    const doc = await UserModel.findById(userId).lean();
    if (!doc) {
      return null;
    }

    return new User(
      doc._id.toString(),
      doc.email,
      doc.name,
      doc.surname,
      doc.nick,
      doc.image,
    );
  }

  async searchByNick(nick: string): Promise<User[]> {
    const docs = await UserModel.find({
      nick: { $regex: nick, $options: "i" },
    }).lean();

    if (!docs) {
      return [];
    }

    return docs.map(
      (doc) =>
        new User(
          doc._id.toString(),
          doc.email,
          doc.name,
          doc.surname,
          doc.nick,
          doc.image,
        ),
    );
  }

  async update(id: string, values: UpdateProfile): Promise<User | null> {
    const doc = await UserModel.findByIdAndUpdate(
      id,
      { name: values.name, surname: values.surname, nick: values.nick },
      { new: true },
    );
    if (!doc) {
      return null;
    }
    return new User(
      doc._id.toString(),
      doc.email,
      doc.name,
      doc.surname,
      doc.nick,
      doc.image,
    );
  }

  async uploadImage(id: string, pathImage: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { image: pathImage });
  }
}
