import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { listAllPhotoAccommodationService } from "../../services/photo/listAllPhotoAccommodation.service";

export const listAllPhotoAccommodationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { accommodationId } = req.params;

    const accommodationPhotos = await listAllPhotoAccommodationService(
      accommodationId
    );

    return res.status(200).json({
      message: "Successful request",
      photos: accommodationPhotos,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
