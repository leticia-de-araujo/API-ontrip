import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories";
import checkKeyLength from "../../utils/checkKeyLength";

const categoryCreateService = async ({
  name,
}: ICategoryRequest): Promise<Category> => {
  const nameIsInvalid = checkKeyLength("name", name, 50);
  if (nameIsInvalid) {
    throw new AppError(nameIsInvalid.status, nameIsInvalid.message);
  }

  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryCheck = await categoryRepository.findOne({
    where: {
      name: name,
    },
  });
  if (categoryCheck) {
    throw new AppError(409, `This category already exists`);
  }

  const newCategory = categoryRepository.create({
    name,
  });

  await categoryRepository.save(newCategory);

  return newCategory;
};

export default categoryCreateService;
