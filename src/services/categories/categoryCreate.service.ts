import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories";

const categoryCreateService = async ({
  name,
}: ICategoryRequest): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryCheck = await categoryRepository.findOne({
    where: {
      name: name,
    },
  });
  if (categoryCheck) {
    throw new AppError(403, `Category named ${name} already exists`);
  }

  const newCategory = categoryRepository.create({
    name,
  });

  await categoryRepository.save(newCategory);

  return newCategory;
};

export default categoryCreateService;
