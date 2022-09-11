import AppDataSource from "../../data-source";
import { Photo } from "../../entities/photo.entity";
import { AppError } from "../../errors/AppError";

export const listAllPhotoAccommodationService = async (
  accommodationId: string
) => {
  const photoRepository = AppDataSource.getRepository(Photo);
  const photosList = await photoRepository.find();

  const accommodationPhotos = photosList.filter(
    (photo) => photo.accommodation?.id === accommodationId
  );

  return accommodationPhotos;
};
