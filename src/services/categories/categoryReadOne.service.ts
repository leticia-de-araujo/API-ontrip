import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const categoryReadOneService = async (id: string): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({ id: id });
  if (!category) throw new AppError(404, "Category not found");

  return category;
};

export default categoryReadOneService;
