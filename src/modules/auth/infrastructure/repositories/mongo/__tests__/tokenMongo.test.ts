import { TokenMongoRepository } from "../tokenMongo.repository";
import { TokenModel } from "../../../models/Token.model";
import { Token } from "@src/modules/auth/domain/entities/token";
import { clearDatabase, closeDatabase, connect } from "./helpers/test-setup";
import { mockToken, otherMockToken } from "./helpers/mocks";

describe("Auth -> Infrastructure -> Repositories -> Mongo -> TokenMongo", () => {
  let repository: TokenMongoRepository;
  let tokenEntity: Token;

  const { expiresAt, token, userId } = mockToken;

  beforeAll(async () => {
    await connect();
    repository = new TokenMongoRepository();
  });

  beforeEach(async () => {
    await clearDatabase();
    tokenEntity = new Token(userId, token, expiresAt);
    await repository.save(tokenEntity);
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("save -> should save a token and return a Token instance with _id", async () => {
    const newToken = new Token(
      otherMockToken.userId,
      otherMockToken.token,
      otherMockToken.expiresAt,
    );
    const savedToken = await repository.save(newToken);

    // Verificaciones
    expect(savedToken).toBeInstanceOf(Token);
    expect(savedToken.getId()).toBeDefined();
    expect(savedToken.getUserId()).toBe(newToken.getUserId());
    expect(savedToken.getToken()).toBe(newToken.getToken());

    // Verificar que realmente está en la DB
    const dbToken = await TokenModel.findById(savedToken.getId());

    expect(dbToken).not.toBeNull();
    expect(dbToken?.token).toBe(newToken.getToken());
  });

  it("findByToken -> should return a Token if found", async () => {
    const dbToken = await repository.findByToken(tokenEntity.getToken());

    expect(dbToken).not.toBeNull();
    expect(dbToken?.getToken()).toBe(token);
  });

  it("findByToken -> should return null if not found", async () => {
    const dbToken = await repository.findByToken("1");

    expect(dbToken).toBeNull();
  });

  it("deleteByUserId -> should call deleteMany with userId", async () => {
    // Verificación antes de borrar
    const dbToken = await TokenModel.find({ userId: tokenEntity.getUserId() });

    expect(dbToken).not.toBeNull();

    // Ejecutar delete
    await repository.deleteByUserId(tokenEntity.getUserId());

    // Verificación después de borrar
    const deletedTokens = await TokenModel.find({
      userId: tokenEntity.getUserId(),
    });

    expect(deletedTokens.length).toBe(0);
  });

  it(" deleteByUserId -> you shouldn't delete tokens for other user IDs", async () => {
    const {
      expiresAt: otherExpiresAt,
      token: otherToken,
      userId: otherUserId,
    } = otherMockToken;
    const newToken = new Token(otherUserId, otherToken, otherExpiresAt);
    await repository.save(newToken);

    await repository.deleteByUserId(tokenEntity.getUserId());

    const remaining = await TokenModel.find({ userId: otherUserId });
    expect(remaining.length).toBe(1);
    expect(remaining[0].token).toBe(otherToken);
  });
});
