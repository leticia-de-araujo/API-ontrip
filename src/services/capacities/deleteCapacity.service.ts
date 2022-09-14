import AppDataSource from "../../data-source";
import { Capacity } from "../../entities/capacity.entity";
import { AppError } from "../../errors/AppError";

const capacitiesDeleteService = async (id: string) => {
  const capacityRepository = AppDataSource.getRepository(Capacity);
  const capacity = await capacityRepository.findOneBy({ id: id });

  if (!capacity) {
    throw new AppError(404, "Capacity not found");
  }

  await capacityRepository.update(id, { ...capacity, isActive: false });

  return "Capacity deleted with success";
};

export default capacitiesDeleteService;
