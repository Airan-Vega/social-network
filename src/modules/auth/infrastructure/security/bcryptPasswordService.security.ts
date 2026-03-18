import bcrypt from "bcrypt";
import { PasswordService } from "../../application/services/password.service";

export class BcryptPasswordServiceSecurity implements PasswordService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
