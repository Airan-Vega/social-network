import { checkIfFieldExist } from "@src/shared/utils";

export class Follow {
  private readonly authenticatedUserId: string;
  private readonly followedId: string; // Personas a la que sigue el usuario autenticado, es decir, personas a las que yo sigo
  private readonly id?: string;

  constructor(authenticatedUserId: string, followedId: string, id?: string) {
    checkIfFieldExist("authenticatedUserId", authenticatedUserId);
    checkIfFieldExist("followedId", followedId);

    this.authenticatedUserId = authenticatedUserId;
    this.followedId = followedId;
    this.id = id;
  }

  public getAuthenticatedUserId() {
    return this.authenticatedUserId;
  }

  public getFollowedId() {
    return this.followedId;
  }

  public getId() {
    return this.id;
  }
}
