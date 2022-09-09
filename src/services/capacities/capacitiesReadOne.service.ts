import AppDataSource from "../../data-source";
import { Capacity } from "../../entities/capacity.entity";
import { AppError } from "../../errors/AppError";

const capacitiesReadOneService = async (id: string): Promise<Capacity> => {
  const capacityRepository = AppDataSource.getRepository(Capacity);

  const capacity = await capacityRepository.findOneBy({ id: id });

  if (!capacity) {
    throw new AppError(404, "There's no capacity associated with the Id used");
  }

  return capacity;
};

export default capacitiesReadOneService;
