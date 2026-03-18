import { checkIfFieldExist } from "../../../../shared/utils";

export class Token {
  private id?: string;
  private userId: string;
  private token: string;
  private expiresAt: Date;

  constructor(userId: string, token: string, expiresAt: Date, id?: string) {
    checkIfFieldExist("userId", userId);
    checkIfFieldExist("token", token);
    checkIfFieldExist("expiresAt", expiresAt);

    this.id = id;
    this.userId = userId;
    this.token = token;
    this.expiresAt = expiresAt;
  }

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  public getId() {
    return this.id;
  }

  public getUserId() {
    return this.userId;
  }

  public getToken() {
    return this.token;
  }

  public getExpiresAt() {
    return this.expiresAt;
  }
}
