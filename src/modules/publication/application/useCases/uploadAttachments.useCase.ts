import { PublicationRepository } from "../../domain/repositories/publication.repository";
import { AttachmentService } from "../services/attachment.service";
export class UploadAttachmentsUseCase {
  constructor(
    private publicationRepository: PublicationRepository,
    private attachmentService: AttachmentService,
  ) {}

  public async execute(
    publicationId: string,
    attachments: Express.Multer.File[],
  ): Promise<void> {
    const fileMetadata = await this.attachmentService.save(attachments);

    await this.publicationRepository.uploadAttachments(
      publicationId,
      fileMetadata,
    );
  }
}
