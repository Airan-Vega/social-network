import bcrypt from "bcrypt";
import { PasswordService } from "../../application/services/password.service";
import defaultConfig from "../../../../shared/config/default";

export class BcryptPasswordServiceSecurity implements PasswordService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, defaultConfig.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
