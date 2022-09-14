import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/AppError";

const accommodationReadOneService = async (id: string) => {
  const accommodationRepository = AppDataSource.getRepository(Accommodation);

  const accommodation = await accommodationRepository.findOne({
    where: { id: id },
    relations: {
      type: true,
      owner: true,
      capacity: true,
      category: true,
    },
  });
  if (!accommodation) throw new AppError(404, "Accommodation not found");

  const addressRepository = AppDataSource.getRepository(Address);
  const address = await addressRepository.findOneBy({ accommodationId: id });

  if (!address) {
    throw new AppError(404, "Address not found");
  }

  return {
    ...accommodation,
    address: { ...address, accommodationId: undefined },
  };
};

export default accommodationReadOneService;
