import AppDataSource from "../../data-source";
import { Capacity } from "../../entities/capacity.entity";
import { AppError } from "../../errors/AppError";

const capacitiesReadOneService = async (id: string): Promise<Capacity> => {
  const capacityRepository = AppDataSource.getRepository(Capacity);

  const capacity = await capacityRepository.findOneBy({ id: id });

  if (!capacity) {
    throw new AppError(404, "Capacity not found");
  }

  return capacity;
};

export default capacitiesReadOneService;
