import AppDataSource from "../../data-source";
import { Capacity } from "../../entities/capacity.entity";
import { AppError } from "../../errors/AppError";
import { ICapacityRequest } from "../../interfaces/capacities";

const capacitiesCreateService = async ({
  rooms,
  beds,
  totalGuests,
  bathrooms,
}: ICapacityRequest): Promise<Capacity> => {
  const capacityRepository = AppDataSource.getRepository(Capacity);

  const capacityCheck = await capacityRepository.findOne({
    where: {
      rooms: rooms,
      beds: beds,
      totalGuests: totalGuests,
      bathrooms: bathrooms,
    },
  });
  if (capacityCheck) {
    throw new AppError(
      403,
      "There's already a capacity with the same exact data"
    );
  }

  const newCapacity = capacityRepository.create({
    rooms,
    beds,
    totalGuests,
    bathrooms,
  });

  await capacityRepository.save(newCapacity);

  return newCapacity;
};

export default capacitiesCreateService;
