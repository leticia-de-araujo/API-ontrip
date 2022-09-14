import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import categoryUpdateService from "../../services/categories/updateCategory.service";

const categoryUpdateController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const id = req.params.id;

    const updatedCategory = await categoryUpdateService(id, { name });

    return res.json({
      message: "Category updated with success",
      category: updatedCategory,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryUpdateController;
