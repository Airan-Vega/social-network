import { CreatePublicationUseCase } from "./application/useCases/createPublication.useCase";
import { DeletePublicationUseCase } from "./application/useCases/deletePublication.useCase";
import { GetPublicationsUseCase } from "./application/useCases/getPublications.useCase";
import { UpdatePublicationUseCase } from "./application/useCases/updatePublication.useCase";
import { PublicationMongoRepository } from "./infrastructure/repositories/mongo/publicationMongo.repository";
import { PublicationController } from "./interfaces/controllers/publication.controller";
import { createPublicationRouter } from "./interfaces/routes/publication.route";
import { UploadAttachmentsUseCase } from "./application/useCases/uploadAttachments.useCase";
import { LocalAttachmentsService } from "./infrastructure/services/localAttachments.service";

// 1. Infrastructure
const publicationRepository = new PublicationMongoRepository();
const localAttachments = new LocalAttachmentsService();

// 2. Use-cases
const deletePublication = new DeletePublicationUseCase(publicationRepository);
const getPublication = new GetPublicationsUseCase(publicationRepository);
const updatePublication = new UpdatePublicationUseCase(publicationRepository);
const createPublication = new CreatePublicationUseCase(publicationRepository);
const uploadAttachments = new UploadAttachmentsUseCase(
  publicationRepository,
  localAttachments,
);

// 3. Controller
const publicationController = new PublicationController(
  createPublication,
  deletePublication,
  getPublication,
  updatePublication,
  uploadAttachments,
);

// 4. Router — lo que exportas para app.ts
export const publicationRouter = createPublicationRouter(publicationController);
