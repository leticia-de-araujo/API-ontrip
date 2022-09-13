import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Photo } from "../../entities/photo.entity";

export const softDeletePhotoService = async (photoId: string) => {
  if (!photoId) {
    throw new AppError(400, "photoId is missing");
  }

  const photoRepository = AppDataSource.getRepository(Photo);

  const photo = await photoRepository.findOneBy({ id: photoId });

  if (!photo) {
    throw new AppError(404, "Photo not found");
  }

  if (photo.accommodation === null) {
    throw new AppError(400, "Photo already deleted");
  }

  await photoRepository.update(photoId, { accommodation: null });

  return true;
};
