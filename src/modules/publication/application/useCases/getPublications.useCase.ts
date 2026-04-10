import { Publication } from "../../domain/entities/publication";
import { PublicationRepository } from "../../domain/repositories/publication.repository";

export class GetPublicationsUseCase {
  constructor(private publicationRepository: PublicationRepository) {}

  public async execute(
    userAuthenticated: string,
    page: number,
  ): Promise<Publication[]> {
    return await this.publicationRepository.getAllByUser(
      userAuthenticated,
      page,
    );
  }
}
