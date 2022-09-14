import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { softDeletePhotoService } from "../../services/photo/softDeletePhoto.service";

export const softDeletePhotoController = async (
  req: Request,
  res: Response
) => {
  try {
    const { photoId } = req.params;

    const _ = await softDeletePhotoService(photoId);

    return res.status(200).json({ message: "Photo deleted with success" });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
