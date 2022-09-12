import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { Photo } from "../../entities/photo.entity";
import { AppError } from "../../errors/AppError";

export const listAllPhotoAccommodationService = async (
  accommodationId: string
) => {
  const accommodationRepository = AppDataSource.getRepository(Accommodation);
  const photoRepository = AppDataSource.getRepository(Photo);
  const accommodation = await accommodationRepository.findOneBy({
    id: accommodationId,
  });
  const photosList = await photoRepository.find();

  if (!accommodation) {
    throw new AppError(404, "Accommodation not found");
  }

  const accommodationPhotos = photosList.filter(
    (photo) => photo.accommodation?.id === accommodationId
  );

  return accommodationPhotos;
};
