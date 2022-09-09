import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequestPatch } from "../../interfaces/categories";

const categoryUpdateService = async (
  id: string,
  { name }: ICategoryRequestPatch
): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({ id: id });
  if (!category) throw new AppError(404, "Category not found");

  const newCategory = categoryRepository.create({
    name: name ? name : category.name,
  });

  await categoryRepository.update(id, newCategory);

  const updatedCategory = await categoryRepository.findOneBy({ id: id });

  return updatedCategory!;
};

export default categoryUpdateService;
