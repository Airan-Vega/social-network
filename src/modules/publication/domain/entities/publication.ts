import { checkIfFieldExist } from "@src/shared/utils";
import { IAttachments } from "../interfaces/attachment.interface";

export class Publication {
  private userId: string;
  private text: string;
  private attachments?: IAttachments[];
  private id?: string;

  constructor(
    userId: string,
    text: string,
    attachments?: IAttachments[],
    id?: string,
  ) {
    checkIfFieldExist("userId", userId);
    checkIfFieldExist("text", text);

    this.userId = userId;
    this.text = text;
    this.attachments = attachments;
    this.id = id;
  }

  public getUserId() {
    return this.userId;
  }

  public getText() {
    return this.text;
  }

  public getAttachments() {
    return this.attachments;
  }

  public getId() {
    return this.id;
  }
}
