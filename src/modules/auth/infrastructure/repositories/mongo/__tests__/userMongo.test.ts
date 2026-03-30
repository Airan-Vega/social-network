import { Types } from "mongoose";
import { UserMongoRepository } from "../userMongo.repository";
import { User } from "@src/modules/auth/domain/entities/user";
import { clearDatabase, closeDatabase, connect } from "./helpers/test-setup";
import { mockUser, otherMockUser } from "./helpers/mocks";
import { UserModel } from "@src/shared/models/user.model";

describe("Auth -> Infrastructure -> Repositories -> Mongo -> UserMongo", () => {
  let repository: UserMongoRepository;
  let userEntity: User;

  const { email, password } = mockUser;

  beforeAll(async () => {
    await connect();
    repository = new UserMongoRepository();
  });

  beforeEach(async () => {
    await clearDatabase();
    userEntity = new User(email, password);
    await repository.save(userEntity);
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("findByEmail -> should return a User if found", async () => {
    const dbUser = await repository.findByEmail(userEntity.getEmail());

    expect(dbUser).not.toBeNull();
    expect(dbUser?.getEmail()).toBe(email);
  });

  it("findByEmail -> should return null if not found", async () => {
    const dbUser = await repository.findByEmail("notfound@test.com");

    expect(dbUser).toBeNull();
  });

  it("findById -> should return a User if found", async () => {
    const user = await UserModel.findOne({ email: userEntity.getEmail() });
    const userId = user?._id?.toString() || "";
    const dbUser = await repository.findById(userId);

    expect(dbUser).not.toBeNull();
    expect(dbUser?.getId()).toBe(userId);
  });

  it("findById -> should return null if not found", async () => {
    const newUserId = new Types.ObjectId().toString();
    const dbUser = await repository.findById(newUserId);

    expect(dbUser).toBeNull();
  });

  it("save -> should save a user and return a User instance with _id", async () => {
    const newUser = new User(otherMockUser.email, otherMockUser.password);
    const savedUser = await repository.save(newUser);

    // Verificaciones
    expect(savedUser).toBeInstanceOf(User);
    expect(savedUser.getId()).toBeDefined();
    expect(savedUser.getEmail()).toBe(newUser.getEmail());
    expect(savedUser.getPassword()).toBe(newUser.getPassword());
    expect(savedUser.getIsActive()).toBe(newUser.getIsActive());
    expect(savedUser.getRole()).toBe(newUser.getRole());

    // Verificar que realmente está en la DB
    const dbUser = await UserModel.findById(savedUser.getId());

    expect(dbUser).not.toBeNull();
    expect(dbUser?.email).toBe(newUser.getEmail());
  });

  it("updateIsActive -> should update only the “isActive” field", async () => {
    // Buscamos un usuario
    let dbUser = await repository.findByEmail(userEntity.getEmail());

    expect(dbUser).not.toBeNull();
    expect(dbUser?.getIsActive()).toBe(userEntity.getIsActive());

    // Actualizamos el campo "isActive"
    const userId = dbUser!.getId() || "";
    const isActive = !dbUser?.getIsActive();

    await repository.updateIsActive(userId, isActive);

    // Volvemos a buscar el usuario y verificamos que el campo "isActive" cambio
    dbUser = await repository.findById(userId);

    expect(dbUser?.getIsActive()).not.toBe(userEntity.getIsActive());
    expect(dbUser?.getEmail()).toBe(userEntity.getEmail());
    expect(dbUser?.getPassword()).toBe(userEntity.getPassword());
    expect(dbUser?.getRole()).toBe(userEntity.getRole());
  });
});
