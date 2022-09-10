import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { createPhotoService } from "../../services/photo/createPhoto.service";

export const createPhotoController = async (req: Request, res: Response) => {
  try {
    const content = req.file;
    const { accommodationId } = req.params;

    if (!content) {
      throw new AppError(400, "send an image");
    }

    const photo = await createPhotoService({ content, accommodationId });

    return res.status(201).json(photo);
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
