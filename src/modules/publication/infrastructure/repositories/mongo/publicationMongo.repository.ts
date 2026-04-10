import mongoose from "mongoose";

import { Publication } from "@src/modules/publication/domain/entities/publication";
import { PublicationRepository } from "@src/modules/publication/domain/repositories/publication.repository";
import { PublicationModel } from "../../models/publication.model";
import { AppError } from "@src/shared/utils";
import { ERROR_MESSAGES, HTTP_CODES } from "@src/shared/constants";

export class PublicationMongoRepository implements PublicationRepository {
  async getAllByUser(
    userAuthenticated: string,
    page = 1,
    pageSize = 10,
  ): Promise<Publication[] | []> {
    const skip = (page - 1) * pageSize;
    const docs = await PublicationModel.find({ userId: userAuthenticated })

      .skip(skip)
      .limit(pageSize)
      .lean();

    if (!docs) {
      return [];
    }

    return docs.map(
      (publication) =>
        new Publication(
          publication.userId.toString(),
          publication.text,
          publication.attachments,
          publication._id.toString(),
        ),
    );
  }

  async create(publication: Publication): Promise<Publication> {
    if (!publication.getUserId()) {
      throw new AppError(
        ERROR_MESSAGES.USER_ID_IS_REQUIRED,
        HTTP_CODES.BAD_REQUEST,
      );
    }

    const result = await PublicationModel.create({
      userId: new mongoose.Types.ObjectId(publication.getUserId()),
      text: publication.getText(),
      attachments: publication.getAttachments(),
    });

    return new Publication(
      result.userId.toString(),
      result.text,
      result.attachments,
      result._id.toString(),
    );
  }

  async update(
    publicationId: string,
    text: string,
  ): Promise<Publication | null> {
    const result = await PublicationModel.findByIdAndUpdate(
      publicationId,
      {
        text,
      },
      { new: true },
    );

    if (!result) {
      return null;
    }

    return new Publication(
      result.userId.toString(),
      result.text,
      result.attachments,
      result._id.toString(),
    );
  }

  async delete(publicationId: string): Promise<void> {
    const doc = await PublicationModel.findById(publicationId);

    if (!doc) {
      throw new AppError(
        ERROR_MESSAGES.PUBLICATION_NOT_FOUND,
        HTTP_CODES.NOT_FOUND,
      );
    }
    await PublicationModel.findByIdAndDelete(publicationId);
  }
}
