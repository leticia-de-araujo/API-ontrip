import AppDataSource from "../../data-source";
import { Photo } from "../../entities/photo.entity";
import { AppError } from "../../errors/AppError";

export const listOnePhotoService = async (photoId: string) => {
  if (!photoId) {
    throw new AppError(400, "photoId is missing");
  }

  const photoRepository = AppDataSource.getRepository(Photo);
  const photo = await photoRepository.findOneBy({ id: photoId });

  if (!photo) {
    throw new AppError(404, "Photo not found");
  }

  return photo;
};
