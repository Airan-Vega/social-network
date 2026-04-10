import { checkIfFieldExist } from "@src/shared/utils";
import { Attachment } from "../types/attachment";

export class Publication {
  private userId: string;
  private text?: string;
  private attachments?: Attachment[];
  private id?: string;

  constructor(
    userId: string,
    text?: string,
    attachments?: Attachment[],
    id?: string,
  ) {
    checkIfFieldExist("userId", userId);

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
