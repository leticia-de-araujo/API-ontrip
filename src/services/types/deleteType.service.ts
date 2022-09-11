import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";
import { AppError } from "../../errors/AppError";

const deleteTypeService = async (id: string) => {
  const typeRepository = AppDataSource.getRepository(Type);
  const type = await typeRepository.findOneBy({ id: id });

  if (!type) {
    throw new AppError(404, "Type not found");
  }

  await typeRepository.update(id, { ...type, isActive: false });

  return { ...type, isActive: false };
};

export default deleteTypeService;
