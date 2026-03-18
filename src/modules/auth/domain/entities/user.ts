import {
  checkIfFieldExist,
  validateEmail,
} from "../../../../shared/utils/validateFields";
export class User {
  private id?: string;
  private email: string;
  private password: string;
  private isActive: boolean;

  constructor(email: string, password: string, isActive = true, id?: string) {
    checkIfFieldExist("email", email);
    validateEmail(email);
    checkIfFieldExist("password", password);

    this.id = id;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
  }

  public getId() {
    return this.id;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  public getIsActive() {
    return this.isActive;
  }
}
