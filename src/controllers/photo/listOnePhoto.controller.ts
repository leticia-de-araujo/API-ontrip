import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { listOnePhotoService } from "../../services/photo/listOnePhoto.service";

export const lisOnePhotoController = async (req: Request, res: Response) => {
  try {
    const { photoId } = req.params;

    if (!photoId) {
      throw new AppError(400, "photoId is missing");
    }

    const photo = await listOnePhotoService(photoId);

    return res.status(200).json(photo);
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
