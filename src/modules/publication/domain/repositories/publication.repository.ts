import { Publication } from "../entities/publication";

export interface PublicationRepository {
  getAllByUser(
    userAuthenticated: string,
    page?: number,
    pageSize?: number,
  ): Promise<Publication[]>;
  create(publication: Publication): Promise<Publication>;
  update(publicationId: string, text: string): Promise<Publication | null>;
  delete(publicationId: string): Promise<void>;
}
