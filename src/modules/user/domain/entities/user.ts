import { checkIfFieldExist, validateEmail } from "../../../../shared/utils";

export class User {
  private id: string;
  private email: string;
  private name?: string;
  private surname?: string;
  private nick?: string;
  private image?: string;

  constructor(
    id: string,
    email: string,
    name?: string,
    surname?: string,
    nick?: string,
    image?: string,
  ) {
    checkIfFieldExist("id", id);
    checkIfFieldExist("email", email);
    validateEmail(email);

    this.id = id;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.nick = nick;
    this.image = image;
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string | undefined {
    return this.name;
  }

  public getSurname(): string | undefined {
    return this.surname;
  }

  public getNick(): string | undefined {
    return this.nick;
  }

  public getImage(): string | undefined {
    return this.image;
  }
}
