import { Attachment } from "../../domain/types/attachment";

export interface PublicationDto {
  userId: string;
  text?: string;
  attachments?: Attachment[];
  id?: string;
}
