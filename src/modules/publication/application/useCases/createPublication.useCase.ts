import { Publication } from "../../domain/entities/publication";
import { PublicationRepository } from "../../domain/repositories/publication.repository";
import { PublicationDto } from "../dtos/publication.dto";

export class CreatePublicationUseCase {
  constructor(private publicationRepository: PublicationRepository) {}

  public async execute(dto: PublicationDto): Promise<Publication> {
    const publication = new Publication(dto.userId, dto.text);

    return await this.publicationRepository.create(publication);
  }
}
