import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/AppError";

export const listAllAddressesService = async () => {
  const addressRepository = AppDataSource.getRepository(Address);
  const addresses = await addressRepository.find();

  return addresses;
};
