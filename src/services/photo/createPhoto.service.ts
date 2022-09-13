import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { Photo } from "../../entities/photo.entity";
import { AppError } from "../../errors/AppError";
import { IPhotoRequest } from "../../interfaces/photos";
import { v2 as cloudinary } from "cloudinary";

export const createPhotoService = async ({
  file,
  accommodationId,
}: IPhotoRequest) => {
  const photoRepository = AppDataSource.getRepository(Photo);
  const accommodationRepository = AppDataSource.getRepository(Accommodation);
  const accommodation = await accommodationRepository.findOneBy({
    id: accommodationId,
  });

  if (!accommodation) {
    throw new AppError(404, "Accommodation not found");
  }

  let img =
    "https://res.cloudinary.com/duz8wq1jo/image/upload/v1662735741/gn1ngtjtzz8cyfvfzmvf.jpg";

  if (file) {
    img = cloudinary.url(file);
  }

  // Opcão de já salvar no DB a url da imagem em vez da referência.

  const photo = photoRepository.create({
    content: img,
    accommodation,
  });

  await photoRepository.save(photo);

  return photo;
};
