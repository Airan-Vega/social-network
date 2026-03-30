import refreshExpiry from "@src/shared/utils/refreshExpiry";
import { Types } from "mongoose";

export const mockToken = {
  userId: new Types.ObjectId().toString(),
  token: "tokentest123",
  expiresAt: refreshExpiry,
};

export const otherMockToken = {
  userId: new Types.ObjectId().toString(),
  token: "otherTokentest123",
  expiresAt: refreshExpiry,
};

export const mockUser = {
  email: "test@test.com",
  password: "123456",
};

export const otherMockUser = {
  email: "test2@test.com",
  password: "5678",
};
