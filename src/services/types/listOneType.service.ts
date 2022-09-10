import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/AppError";

const listOneTypeService = async (typeId: string) => {
  const typeRepository = AppDataSource.getRepository(Type);
  const type = await typeRepository.findOneBy({ id: typeId });
  if (!type) {
    throw new AppError(
      400,
      "There's no type associated with Id used on params"
    );
  }

  return type;
};

export default listOneTypeService;
