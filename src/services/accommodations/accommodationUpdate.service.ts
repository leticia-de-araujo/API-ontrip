import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { Capacity } from "../../entities/capacity.entity";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/AppError";
import { IAccommodationRequestPatch } from "../../interfaces/accommodations";

const accommodationUpdateService = async (
  id: string,
  {
    name,
    description,
    dailyPrice,
    verifiedByAdm,
    specialOffer,
    capacityId,
    typeId,
  }: IAccommodationRequestPatch
): Promise<Accommodation> => {
  const accommodationRepository = AppDataSource.getRepository(Accommodation);

  const capacityRepository = AppDataSource.getRepository(Capacity);
  const capacity = await capacityRepository.findOneBy({ id: capacityId });
  if (!capacity) throw new AppError(404, "Capacity not found");

  const typeRepository = AppDataSource.getRepository(Type);
  const type = await typeRepository.findOneBy({ id: typeId });
  if (!type) throw new AppError(404, "Type not found");

  const accommodation = await accommodationRepository.findOneBy({ id: id });

  if (!accommodation) throw new AppError(404, "Accommodation not found");

  const updatedAccommodation = accommodationRepository.create({
    id: accommodation.id,
    name: name ? name : accommodation.name,
    description: description ? description : accommodation.description,
    dailyPrice: dailyPrice ? dailyPrice : accommodation.dailyPrice,
    verifiedByAdm: verifiedByAdm ? verifiedByAdm : accommodation.verifiedByAdm,
    specialOffer: specialOffer ? specialOffer : accommodation.specialOffer,
    capacity: capacity ? capacity : accommodation.capacity,
    type: type ? type : accommodation.type,
  });

  const accommodationCheck = await accommodationRepository.findOne({
    where: {
      name: updatedAccommodation.name,
      description: updatedAccommodation.description,
      dailyPrice: updatedAccommodation.dailyPrice,
      verifiedByAdm: updatedAccommodation.verifiedByAdm,
      specialOffer: updatedAccommodation.specialOffer,
      capacity: updatedAccommodation.capacity,
      type: updatedAccommodation.type,
    },
  });
  if (accommodationCheck) {
    throw new AppError(
      400,
      "Not possible to update an accommodation without having any changes in any field"
    );
  }

  await accommodationRepository.update(id, updatedAccommodation);

  const accommodationUp = await accommodationRepository.findOneBy({ id });

  return accommodationUp!;
};

export default accommodationUpdateService;
