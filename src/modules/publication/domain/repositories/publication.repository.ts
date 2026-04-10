import { Publication } from "../entities/publication";

export interface PublicationRepository {
  getAllByUser(
    userAuthenticated: string,
    page?: number,
  ): Promise<Publication[]>;
  create(publication: Publication): Promise<Publication>;
  update(publication: Publication): Promise<Publication | null>;
  delete(publicationId: string): Promise<void>;
}
