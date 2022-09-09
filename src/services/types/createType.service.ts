import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/AppError";
import { ITypeRequest } from "../../interfaces/types";

const createTypeService = async ({ name }: ITypeRequest) => {
  const typeRepository = AppDataSource.getRepository(Type);

  const typeAlreadyExists = await typeRepository.findOneBy({ name: name });
  if (!typeAlreadyExists) {
    throw new AppError(403, "There's already a type with the same name");
  }

  const newType = typeRepository.create({ name: name });
  await typeRepository.save(newType);
  return newType;
};

export default createTypeService;
