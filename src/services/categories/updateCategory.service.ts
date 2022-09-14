import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequestPatch } from "../../interfaces/categories";
import checkKeyLength from "../../utils/checkKeyLength";

const categoryUpdateService = async (
  id: string,
  { name }: ICategoryRequestPatch
): Promise<Category> => {
  const nameIsInvalid = checkKeyLength("name", name, 50);
  if (nameIsInvalid) {
    throw new AppError(nameIsInvalid.status, nameIsInvalid.message);
  }

  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({ id: id });
  if (!category) throw new AppError(404, "Category not found");

  const categoryCheck = await categoryRepository.findOneBy({ name: name });
  if (categoryCheck) {
    throw new AppError(
      400,
      "Not possible to update a category without having any changes in any field"
    );
  }

  const newCategory = {
    name: name ? name : category.name,
  };

  await categoryRepository.update(id, newCategory);

  return { ...category, ...newCategory };
};

export default categoryUpdateService;
