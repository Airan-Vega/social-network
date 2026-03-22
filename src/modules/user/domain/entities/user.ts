import { checkIfFieldExist, validateEmail } from "../../../../shared/utils";

export class User {
  private id: string;
  private name: string;
  private surname: string;
  private email: string;
  private image?: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    email: string,
    image?: string,
  ) {
    checkIfFieldExist("id", id);
    checkIfFieldExist("name", name);
    checkIfFieldExist("surname", surname);
    checkIfFieldExist("email", email);
    validateEmail(email);

    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.image = image;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getSurname() {
    return this.surname;
  }

  public getEmail() {
    return this.email;
  }

  public getImage() {
    return this.image;
  }
}
