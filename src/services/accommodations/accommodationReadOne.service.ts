import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { AppError } from "../../errors/AppError";

const accommodationReadOneService = async (
  id: string
): Promise<Accommodation> => {
  const accommodationRepository = AppDataSource.getRepository(Accommodation);

  const accommodation = await accommodationRepository.findOne({
    where: { id: id },
    relations: {
      type: true,
      owner: true,
      capacity: true,
      category: true,
    },
  });
  if (!accommodation) throw new AppError(404, "Accommodation not found");

  return accommodation;
};

export default accommodationReadOneService;
