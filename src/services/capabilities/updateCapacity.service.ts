import AppDataSource from "../../data-source";
import { Capacity } from "../../entities/capacity.entity";
import { AppError } from "../../errors/AppError";
import { ICapacityRequestPatch } from "../../interfaces/capacities";

const updateCapacityService = async (
  id: string,
  { rooms, beds, totalGuests, bathrooms }: ICapacityRequestPatch
): Promise<Capacity> => {
  const capacityRepository = AppDataSource.getRepository(Capacity);

  const capacity = await capacityRepository.findOneBy({ id: id });
  if (!capacity) {
    throw new AppError(404, "There's no capacity associated with this Id");
  }

  const newCapacity = capacityRepository.create({
    rooms: rooms ? rooms : capacity.rooms,
    beds: beds ? beds : capacity.beds,
    totalGuests: totalGuests ? totalGuests : capacity.totalGuests,
    bathrooms: bathrooms ? bathrooms : capacity.bathrooms,
  });

  const capacityCheck = await capacityRepository.findOne({
    where: {
      rooms: newCapacity.rooms,
      beds: newCapacity.beds,
      totalGuests: newCapacity.totalGuests,
      bathrooms: newCapacity.bathrooms,
    },
  });
  if (capacityCheck) {
    throw new AppError(
      403,
      "There's already a capacity with the intended data in the database"
    );
  }

  await capacityRepository.update(id, newCapacity);

  return newCapacity;
};

export default updateCapacityService;
