import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Accommodation } from "../../entities/accommodation.entity";
import { Address } from "../../entities/address.entity";
import { IAddressRequestPatch } from "../../interfaces/address";

export const updateAddressService = async ({
  accommodationId,
  postalCode,
  street,
  complement,
  addressId,
}: IAddressRequestPatch) => {
  const accommodationRepository = AppDataSource.getRepository(Accommodation);
  const addressRepository = AppDataSource.getRepository(Address);

  const accommodation = await accommodationRepository.findOneBy({
    id: accommodationId,
  });
  const address = await addressRepository.findOneBy({ id: addressId });

  if (!address) {
    throw new AppError(404, "Address not found!");
  }

  if (!accommodation) {
    throw new AppError(404, "Accommodation not found!");
  }

  const updatedAddress = await addressRepository.update(address.id, {
    postalCode: postalCode || address.postalCode,
    street: street || address.street,
    complement: complement || address.complement,
  });

  return updatedAddress;
};
