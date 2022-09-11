import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/AppError";
import { ITypeRequest } from "../../interfaces/types";
import checkKeyLength from "../../utils/checkKeyLength";

const createTypeService = async ({ name }: ITypeRequest) => {
  const nameIsInvalid = checkKeyLength("name", name, 50);
  if (nameIsInvalid) {
    throw new AppError(nameIsInvalid.status, nameIsInvalid.message);
  }

  const typeRepository = AppDataSource.getRepository(Type);
  const typeAlreadyExists = await typeRepository.findOneBy({ name: name });
  if (typeAlreadyExists) {
    throw new AppError(409, "This type already exists");
  }

  const newType = typeRepository.create({ name: name });
  await typeRepository.save(newType);
  return newType;
};

export default createTypeService;
