import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/AppError";
import { IType } from "../../interfaces/types";

const updateTypeService = async ({ name, id }: IType) => {
  const typeRepository = AppDataSource.getRepository(Type);

  const typeAlreadyExists = await typeRepository.findOneBy({ name: name });
  if (typeAlreadyExists) {
    throw new AppError(403, "There's already a type with the same name");
  }

  const typeUpdated = typeRepository.create({
    name: name,
  });

  await typeRepository.update(id, typeUpdated);
  return typeUpdated;
};

export default updateTypeService;
