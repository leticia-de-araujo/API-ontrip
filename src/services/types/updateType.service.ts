import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/AppError";
import { IType } from "../../interfaces/types";
import checkKeyLength from "../../utils/checkKeyLength";

const updateTypeService = async ({ name, id }: IType) => {
  const nameIsInvalid = checkKeyLength("name", name, 50);
  if (nameIsInvalid) {
    throw new AppError(nameIsInvalid.status, nameIsInvalid.message);
  }

  const typeRepository = AppDataSource.getRepository(Type);

  const targetExists = await typeRepository.findOneBy({ id: id });
  if (!targetExists) {
    throw new AppError(404, "Type not found");
  }
  if (targetExists.name === name) {
    throw new AppError(
      400,
      "Not possible to update a type without having any changes in any field"
    );
  }

  const typeAlreadyExists = await typeRepository.findOneBy({ name: name });
  if (typeAlreadyExists) {
    throw new AppError(403, "There's already a type with the same name");
  }

  const typeUpdated = {
    name: name,
  };

  await typeRepository.update(id, typeUpdated);
  return typeUpdated;
};

export default updateTypeService;
