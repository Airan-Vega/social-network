import { Publication } from "../entities/publication";

export interface PublicationRepository {
  getPublications(): Promise<Publication[]>;
  create(publication: Publication): Promise<Publication>;
  update(publicationId: string, publication: Publication): Promise<Publication>;
  delete(publicationId: string): Promise<void>;
}
