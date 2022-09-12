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
    throw new AppError(404, "Capacity not found");
  }

  const capacityUpdated: ICapacityRequestPatch = {
    rooms: rooms ? rooms : capacity.rooms,
    beds: beds ? beds : capacity.beds,
    totalGuests: totalGuests ? totalGuests : capacity.totalGuests,
    bathrooms: bathrooms ? bathrooms : capacity.bathrooms,
  };

  const capacityCheck = await capacityRepository.findOne({
    where: {
      rooms: capacityUpdated.rooms,
      beds: capacityUpdated.beds,
      totalGuests: capacityUpdated.totalGuests,
      bathrooms: capacityUpdated.bathrooms,
    },
  });

  if (capacityCheck) {
    throw new AppError(
      400,
      "Not possible to update a capacity without having any changes in any field"
    );
  }

  await capacityRepository.update(id, capacityUpdated);

  return { ...capacity, ...capacityUpdated };
};

export default capacitiesUpdateService;
