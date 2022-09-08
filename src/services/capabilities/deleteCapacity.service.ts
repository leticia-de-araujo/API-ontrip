import AppDataSource from "../../data-source";
import { Capacity } from "../../entities/capacity.entity";
import { AppError } from "../../errors/AppError";

const deleteCapacityService = async (id: string): Promise<string> => {
  const capacityRepository = AppDataSource.getRepository(Capacity);

  const capacity = await capacityRepository.findOneBy({ id: id });
  if (!capacity) {
    throw new AppError(404, "There's no capacity associated with this Id");
  }

  await capacityRepository.delete(id);

  return "Capacity deleted";
};

export default deleteCapacityService;
