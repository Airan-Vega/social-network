import { Publication } from "../../domain/entities/publication";
import { PublicationRepository } from "../../domain/repositories/publication.repository";

export class UpdatePublicationUseCase {
  constructor(private publicationRepository: PublicationRepository) {}

  public async execute(
    publicationId: string,
    text: string,
  ): Promise<Publication | null> {
    return await this.publicationRepository.update(publicationId, text);
  }
}
