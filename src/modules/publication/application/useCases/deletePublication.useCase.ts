import { PublicationRepository } from "../../domain/repositories/publication.repository";

export class DeletePublicationUseCase {
  constructor(private publicationRepository: PublicationRepository) {}

  public async execute(publicationId: string): Promise<void> {
    await this.publicationRepository.delete(publicationId);
  }
}
