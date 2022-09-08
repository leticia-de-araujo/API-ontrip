import AppDataSource from "../../data-source";
import { Capacity } from "../../entities/capacity.entity";
import { AppError } from "../../errors/AppError";
import { ICapacityRequestPatch } from "../../interfaces/capacities";

const capacitiesUpdateService = async (
  id: string,
  { rooms, beds, totalGuests, bathrooms }: ICapacityRequestPatch
): Promise<Capacity> => {
  const capacityRepository = AppDataSource.getRepository(Capacity);

  const capacity = await capacityRepository.findOneBy({ id: id });

  if (!capacity) {
    throw new AppError(404, "There's no capacity associated with this id");
  }

  const capacityUpdayed = capacityRepository.create({
    rooms: rooms ? rooms : capacity.rooms,
    beds: beds ? beds : capacity.beds,
    totalGuests: totalGuests ? totalGuests : capacity.totalGuests,
    bathrooms: bathrooms ? bathrooms : capacity.bathrooms,
  });

  const capacityCheck = await capacityRepository.findOne({
    where: {
      rooms: capacityUpdayed.rooms,
      beds: capacityUpdayed.beds,
      totalGuests: capacityUpdayed.totalGuests,
      bathrooms: capacityUpdayed.bathrooms,
    },
  });

  if (capacityCheck) {
    throw new AppError(
      403,
      "There's already a capacity with the intended data in the database"
    );
  }

  await capacityRepository.update(id, capacityUpdayed);

  return capacityUpdayed;
};

export default capacitiesUpdateService;
