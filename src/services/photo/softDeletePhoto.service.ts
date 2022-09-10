import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Photo } from "../../entities/photo.entity";

export const softDeletePhotoService = async (photoId: string) => {
  const photoRepository = AppDataSource.getRepository(Photo);

  const photo = await photoRepository.findOneBy({ id: photoId });

  if (!photo) {
    throw new AppError(404, "Photo not found");
  }

  await photoRepository.update(photoId, { accommodation: null });

  return true;
};
