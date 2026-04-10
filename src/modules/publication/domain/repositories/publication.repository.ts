import { Publication } from "../entities/publication";
import { UpdatePublication } from "../types/ updatePublication";

export interface PublicationRepository {
  getAll(): Promise<Publication[]>;
  create(publication: Publication): Promise<Publication>;
  update(
    publicationId: string,
    publication: UpdatePublication,
  ): Promise<Publication>;
  delete(publicationId: string): Promise<void>;
}
