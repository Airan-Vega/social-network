import { Attachment } from "./attachment";

export interface UpdatePublication {
  text?: string;
  attachments?: Attachment[];
}
