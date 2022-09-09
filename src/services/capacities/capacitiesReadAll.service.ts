import AppDataSource from "../../data-source";
import { Capacity } from "../../entities/capacity.entity";

const capacitiesReadAllService = async (): Promise<Capacity[]> => {
  const capacityRepository = AppDataSource.getRepository(Capacity);

  const capacities = await capacityRepository.find();

  return capacities;
};

export default capacitiesReadAllService;
