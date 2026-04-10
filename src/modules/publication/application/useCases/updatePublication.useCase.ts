import { PublicationRepository } from "../../domain/repositories/publication.repository";
import { UpdatePublication } from "../../domain/types/ updatePublication";

export class UpdatePublicationUseCase {
  constructor(private publicationRepository: PublicationRepository) {}

  public async execute(
    publicationId: string,
    publicationValues: UpdatePublication,
  ) {
    return await this.publicationRepository.update(
      publicationId,
      publicationValues,
    );
  }
}
