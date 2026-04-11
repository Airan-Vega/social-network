import { NextFunction, Request, Response } from "express";

import { CreatePublicationUseCase } from "../../application/useCases/createPublication.useCase";
import { DeletePublicationUseCase } from "../../application/useCases/deletePublication.useCase";
import { GetPublicationsUseCase } from "../../application/useCases/getPublications.useCase";
import { UpdatePublicationUseCase } from "../../application/useCases/updatePublication.useCase";
import { UploadAttachmentsUseCase } from "../../application/useCases/uploadAttachments.useCase";
import { AppError } from "@src/shared/utils";
import { ERROR_MESSAGES, HTTP_CODES } from "@src/shared/constants";

export class PublicationController {
  constructor(
    private createPublicationUseCase: CreatePublicationUseCase,
    private deletePublicationUseCase: DeletePublicationUseCase,
    private getPublicationsUseCase: GetPublicationsUseCase,
    private updatePublicationUseCase: UpdatePublicationUseCase,
    private uploadAttachmentsUseCase: UploadAttachmentsUseCase,
  ) {}

  public async createPublication(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId: string = req.user!.id; // Viene del auth middleware
      const { text } = req.body;
      const result = await this.createPublicationUseCase.execute({
        userId,
        text,
      });
      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  public async getPublications(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.id; // Viene del auth middleware
      const page = Number(req.query.page);

      const result = await this.getPublicationsUseCase.execute(userId, page);

      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  public async updatePublication(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const publicationId = req.params.id.toString();
      const { text } = req.body;
      const result = await this.updatePublicationUseCase.execute(
        publicationId,
        text,
      );

      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  public async deletePublication(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const publicationId = req.params.id.toString();
      await this.deletePublicationUseCase.execute(publicationId);
      return res.status(200).json({
        message: "The publication has been deleted correctly",
      });
    } catch (error) {
      next(error);
    }
  }

  public async uploadAttachments(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const publicationId = req.params.id.toString();
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        throw new AppError(
          ERROR_MESSAGES.ATTACHMENTS_ARE_REQUIRED,
          HTTP_CODES.BAD_REQUEST,
        );
      }

      await this.uploadAttachmentsUseCase.execute(publicationId, files);

      return res.status(200).json({
        message: "Files saved successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
