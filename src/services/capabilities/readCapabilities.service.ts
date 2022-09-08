import AppDataSource from "../../data-source";
import { Capacity } from "../../entities/capacity.entity";

const readCapabilitiesService = async (): Promise<Capacity[]> => {
  const capacityRepository = AppDataSource.getRepository(Capacity);

  const capabilities = await capacityRepository.find();

  return capabilities;
};

export default readCapabilitiesService;
