import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { AppError } from "../../errors/AppError";

const accommodationDeleteService = async (id: string): Promise<string> => {
  const accommodationRepository = AppDataSource.getRepository(Accommodation);

  const accommodation = await accommodationRepository.findOneBy({ id: id });
  if (!accommodation) throw new AppError(404, "Accommodation not found");
  if (accommodation.isActive === false) {
    throw new AppError(400, "Accommodation already deleted");
  }

  await accommodationRepository.update(id, {
    isActive: false,
  });

  return "Accommodation deleted with success";
};

export default accommodationDeleteService;
