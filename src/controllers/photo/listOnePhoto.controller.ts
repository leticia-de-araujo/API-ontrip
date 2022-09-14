import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { listOnePhotoService } from "../../services/photo/listOnePhoto.service";

export const lisOnePhotoController = async (req: Request, res: Response) => {
  try {
    const { photoId } = req.params;

    const photo = await listOnePhotoService(photoId);

    return res.status(200).json({
      message: "Successful request",
      photo,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
