import AppDataSource from "../../data-source";
import { Type } from "../../entities/type.entity";

const listTypesService = async () => {
  const typeRepository = AppDataSource.getRepository(Type);
  const types = await typeRepository.find();

  return types;
};

export default listTypesService;
