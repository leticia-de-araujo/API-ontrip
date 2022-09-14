import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Accommodation } from "../../entities/accommodation.entity";
import { Address } from "../../entities/address.entity";
import { IAddressRequestPatch } from "../../interfaces/address";

export const updateAddressService = async (
  id: string,
  { accommodationId, postalCode, street, complement }: IAddressRequestPatch
) => {
  if (!accommodationId) {
    throw new AppError(
      400,
      "The following fields are mandatory: accommodationId"
    );
  }

  if (!postalCode && !street && !complement) {
    throw new AppError(
      400,
      "Not possible to update an address without having any changes in any field"
    );
  }

  const accommodationRepository = AppDataSource.getRepository(Accommodation);
  const accommodation = await accommodationRepository.findOneBy({
    id: accommodationId,
  });
  if (!accommodation) {
    throw new AppError(404, "Accommodation not found");
  }

  const addressRepository = AppDataSource.getRepository(Address);
  const address = await addressRepository.findOneBy({ id: id });
  if (!address) {
    throw new AppError(404, "Address not found");
  }

  const updatedAddress = {
    country: address.country,
    state: address.state,
    city: address.city,
    accommodationId: accommodationId
      ? accommodationId
      : address.accommodationId,
    postalCode: postalCode ? postalCode : address.postalCode,
    street: street ? street : address.street,
    complement: complement ? complement : address.complement,
  };

  await addressRepository.update(id, updatedAddress);

  return { ...updatedAddress, id: id };
};
