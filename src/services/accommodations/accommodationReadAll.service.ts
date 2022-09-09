import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";

const accommodationReadAllService = async (): Promise<Accommodation[]> => {
  const accommodationRepository = AppDataSource.getRepository(Accommodation);

  const accommodations = await accommodationRepository.find({
    relations: {
      type: true,
      owner: true,
      capacity: true,
      category: true,
    },
  });

  return accommodations;
};

export default accommodationReadAllService;
