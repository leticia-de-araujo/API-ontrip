import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { Capacity } from "../../entities/capacity.entity";
import { Category } from "../../entities/category.entity";
import { Type } from "../../entities/type.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IAccommodationRequest } from "../../interfaces/accommodations";

const accommodationCreateService = async ({
  name,
  description,
  dailyPrice,
  typeId,
  userId,
  capacityId,
  categoryId,
}: IAccommodationRequest): Promise<Accommodation> => {
  const accommodationRepository = AppDataSource.getRepository(Accommodation);

  const typeRepository = AppDataSource.getRepository(Type);
  const type = await typeRepository.findOneBy({ id: typeId });
  if (!type) throw new AppError(404, "Type not found");

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new AppError(404, "User not found");

  const capacityRepository = AppDataSource.getRepository(Capacity);
  const capacity = await capacityRepository.findOneBy({ id: capacityId });
  if (!capacity) throw new AppError(404, "Capacity not found");

  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOneBy({ id: categoryId });
  if (!category) throw new AppError(404, "Category not found");

  const newAccommodation = accommodationRepository.create({
    name,
    description,
    dailyPrice,
    type: type,
    owner: user,
    capacity: capacity,
    category: category,
  });

  const accommodationCheck = await accommodationRepository.findOne({
    where: {
      name,
      description,
      dailyPrice,
      type: type,
      owner: user,
      capacity: capacity,
      category: category,
    },
  });
  
  if (accommodationCheck) {
    throw new AppError(409, "This accommodation is already registered");
  }

  await accommodationRepository.save(newAccommodation);

  return newAccommodation;
};

export default accommodationCreateService;
