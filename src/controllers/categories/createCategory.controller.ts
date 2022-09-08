import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import createCategoryService from "../../services/categories/createCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const createCategory = await createCategoryService({ name });

    return res
      .status(201)
      .json({ message: "category created", data: createCategory });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default createCategoryController;
