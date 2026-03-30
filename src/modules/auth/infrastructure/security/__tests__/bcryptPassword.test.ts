import { BcryptPasswordServiceSecurity } from "../bcryptPasswordService.security";

describe("Auth -> Infrastructure -> Security -> BcryptPassword", () => {
  let service: BcryptPasswordServiceSecurity;
  const password = "123456";

  beforeEach(async () => {
    service = new BcryptPasswordServiceSecurity();
    jest.clearAllMocks();
  });

  it("hash -> should return an encrypted password", async () => {
    const encryptedPassword = await service.hash(password);

    expect(encryptedPassword).not.toBe(password);
  });

  it("compare -> should return true if passwords match", async () => {
    const encryptedPassword = await service.hash(password);

    const isValid = await service.compare(password, encryptedPassword);

    expect(isValid).toBeTruthy();
  });

  it("compare -> should return false if passwords do not match", async () => {
    const encryptedPassword = await service.hash(password);

    const isValid = await service.compare("123", encryptedPassword);

    expect(isValid).toBeFalsy();
  });
});
