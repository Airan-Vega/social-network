import { checkIfFieldExist, validateEmail } from "../../../../shared/utils";

export class User {
  private id: string;
  private email: string;
  private isActive: boolean;
  private nick?: string;
  private image?: string;

  constructor(
    id: string,
    email: string,
    isActive: boolean,
    nick?: string,
    image?: string,
  ) {
    checkIfFieldExist("id", id);
    checkIfFieldExist("email", email);
    validateEmail(email);
    checkIfFieldExist("isActive", isActive);

    this.id = id;
    this.email = email;
    this.isActive = isActive;
    this.nick = nick;
    this.image = image;
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getNick(): string | undefined {
    return this.nick;
  }

  public getImage(): string | undefined {
    return this.image;
  }
}
