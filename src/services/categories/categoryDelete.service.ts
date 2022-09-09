import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const categoryDeleteService = async (id: string): Promise<string> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({ id: id });
  if (!category) throw new AppError(404, "Category not found");

  await categoryRepository.delete(id);

  return "Category deleted";
};

export default categoryDeleteService;
