import { Publication } from "@src/modules/publication/domain/entities/publication";
import { PublicationRepository } from "@src/modules/publication/domain/repositories/publication.repository";
import { PublicationModel } from "../../models/publication.model";
import { IUserDocument } from "@src/shared/models/user.model";
import mongoose from "mongoose";
import { AppError } from "@src/shared/utils";
import { ERROR_MESSAGES, HTTP_CODES } from "@src/shared/constants";

export class PublicationMongoRepository implements PublicationRepository {
  async getAllByUser(
    userAuthenticated: string,
    page = 1,
  ): Promise<Publication[] | []> {
    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;
    const docs = await PublicationModel.find({ userId: userAuthenticated })
      .populate<{ userId: IUserDocument }>({
        path: "userId",
      })
      .skip(skip)
      .limit(PAGE_SIZE)
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
  async update(publication: Publication): Promise<Publication | null> {
    const doc = await PublicationModel.findById(publication.getId()).lean();

    if (!doc) {
      throw new AppError(
        ERROR_MESSAGES.PUBLICATION_NOT_FOUND,
        HTTP_CODES.NOT_FOUND,
      );
    }

    if (doc.userId.toString() !== publication.getUserId()) {
      throw new AppError(
        ERROR_MESSAGES.FORBIDDEN_RESOURCE_MODIFICATION,
        HTTP_CODES.FORBIDDEN,
      );
    }

    const result = await PublicationModel.findByIdAndUpdate(
      publication.getId(),
      {
        userId: publication.getUserId(),
        text: publication.getText(),
        attachments: publication.getAttachments(),
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
    await PublicationModel.findByIdAndDelete(publicationId);
  }
}
