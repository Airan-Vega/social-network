import { Token } from "../entities/token";

export interface TokenRepository {
  save(token: Token): Promise<Token>;
  findByToken(token: string): Promise<Token | null>;
  deleteByUserId(userId: string): Promise<void>;
}
