import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import categoryUpdateService from "../../services/categories/categoryUpdate.service";

const categoryUpdateController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const id = req.params.id;

    const updatedCategory = await categoryUpdateService(id, { name });

    return res.json({ message: "Category updated", data: updatedCategory });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryUpdateController;
