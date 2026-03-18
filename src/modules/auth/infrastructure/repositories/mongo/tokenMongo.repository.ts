import { Token } from "../../../domain/entities/token";
import { TokenRepository } from "../../../domain/repositories/token.repository";
import { TokenModel } from "../../models/Token.model";

export class TokenMongoRepository implements TokenRepository {
  async save(token: Token): Promise<Token> {
    const doc = await TokenModel.create({
      userId: token.getUserId(),
      token: token.getToken(),
      expiresAt: token.getExpiresAt(),
    });
    return new Token(
      doc.userId.toString(),
      doc.token,
      doc.expiresAt,
      doc._id.toString(),
    );
  }

  async findByToken(token: string): Promise<Token | null> {
    const doc = await TokenModel.findOne({ token }).lean();
    if (!doc) return null;
    return new Token(
      doc.userId.toString(),
      doc.token,
      doc.expiresAt,
      doc._id.toString(),
    );
  }

  async deleteByUserId(userId: string): Promise<void> {
    await TokenModel.deleteMany({ userId });
  }
}
