import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Address } from "../../entities/address.entity";
import { Accommodation } from "../../entities/accommodation.entity";
import { IAddressRequest } from "../../interfaces/address";

export const createAddressService = async ({
  userId,
  accommodationId,
  country,
  state,
  city,
  postalCode,
  street,
  complement,
}: IAddressRequest) => {
  const accommodationRepository = AppDataSource.getRepository(Accommodation);
  const addressRepository = AppDataSource.getRepository(Address);
  const accommodation = await accommodationRepository.findOneBy({
    id: accommodationId,
  });

  if (!accommodation) {
    throw new AppError(404, "Accommodation not found");
  }

  if (accommodation.owner.id !== userId) {
    throw new AppError(401, "Only the property owner can create the address.");
  }

  const address = addressRepository.create({
    country,
    state,
    city,
    postalCode,
    street,
    complement,
    accommodation,
  });

  await addressRepository.save(address);

  return address;
};
