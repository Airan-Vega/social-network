import { Publication } from "../../domain/entities/publication";
import { PublicationRepository } from "../../domain/repositories/publication.repository";

export class GetPublicationsUseCase {
  constructor(private publicationRepository: PublicationRepository) {}

  public async execute(): Promise<Publication[]> {
    return await this.publicationRepository.getAll();
  }
}
