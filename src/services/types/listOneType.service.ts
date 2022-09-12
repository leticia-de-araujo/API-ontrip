import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/AppError";

const listOneTypeService = async (typeId: string) => {
  const typeRepository = AppDataSource.getRepository(Type);
  const type = await typeRepository.findOneBy({ id: typeId });
  if (!type) {
    throw new AppError(404, "Type not found");
  }

  return type;
};

export default listOneTypeService;
