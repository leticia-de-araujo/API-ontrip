import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { createPhotoService } from "../../services/photo/createPhoto.service";

export const createPhotoController = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { accommodationId } = req.params;

    if (!file) {
      throw new AppError(400, "file is a required field");
    }

    const photo = await createPhotoService({ file, accommodationId });

    return res.status(201).json({
      message: "Photo created with success",
      photo,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
